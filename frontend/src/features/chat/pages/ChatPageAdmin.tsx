import { Avatar, Badge, Button, Empty, Form, Input, message, Upload, Spin, Image } from "antd";
import { PaperClipOutlined, SearchOutlined, SendOutlined, SmileOutlined, CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useRoomsAdmin } from "../hooks/useRoomsAdmin";
import LoadingScreen from "../../../shared/components/LoadingScreen";
import CustomAlert from "../../../shared/components/CustomAlert";
import type { IChatMessage, RoomAdmin } from "../types/chatAdmin.type";
import { useMessagesAdmin } from "../hooks/useMessagesAdmin";
import { connectSocket, disconnectSocket, socket } from "../../../sockets/socket";
import { privateAdmin } from "../../../shared/api/privateAdmin";
const { TextArea } = Input;
export interface UploadedFile {
    uid: string;
    url?: string;
    status: "uploading" | "done" | "error";
    name: string;
}

const ChatPageAdmin = () => {
    const [form] = Form.useForm();
    const { rooms, setRooms, loading, error } = useRoomsAdmin();
    const [currentRoom, setCurrentRoom] = useState<RoomAdmin | null>(null);
    const { messages, setMessages } = useMessagesAdmin(currentRoom?._id ?? "");
    const defaultAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePQrmECqQyT4U2vF38XPiBEyF95GRpEgoTriZ3laX_7ce0_An2KeSQlE&s=10";
    useEffect(() => {
        if (rooms.length > 0 && currentRoom === null) {
            setCurrentRoom(rooms[0]);
        }
    }, [rooms, currentRoom]);
    // Cuộn xuống tin nhắn cuối cùng
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
        messagesEndRef.current?.scrollIntoView({ behavior });
    };
    useEffect(() => {
        scrollToBottom("auto");
    }, [currentRoom]);
    useEffect(() => {
        scrollToBottom("smooth");
    }, [messages]);

    // Xử lý tin nhắn realtime qua Socket
    useEffect(() => {
        if (!currentRoom) return;

        const handleConnect = () => {
            socket.emit("join_room", currentRoom._id, (res: any) => {
                if (res.success) {
                    console.log("Đã join room");
                } else {
                    console.log(res.message);
                }
            });
        };

        socket.on("connect", handleConnect);

        const handleReceiveMessage = (message: IChatMessage) => {
            setMessages((prev) => [...prev, message]);
        };
        socket.on("receive_message", handleReceiveMessage);

        const handleUpdateRoom = (data: {
            roomID: string;
            lastMessage: { message: string; role: "admin" | "user"; createdAt: string };
        }) => {
            setRooms((prev) =>
                prev.map((room) => {
                    if (room._id !== data.roomID) return room;
                    const isCurrentRoom = currentRoom._id === data.roomID;
                    return {
                        ...room,
                        lastMessage: data.lastMessage,
                        unreadCount: isCurrentRoom
                            ? { ...room.unreadCount, admin: 0 }
                            : {
                                ...room.unreadCount,
                                admin:
                                    data.lastMessage.role === "user"
                                        ? room.unreadCount.admin + 1
                                        : 0,
                            },
                    };
                })
            );
        };
        socket.on("update_room", handleUpdateRoom);

        connectSocket();

        return () => {
            socket.off("connect", handleConnect);
            socket.off("receive_message", handleReceiveMessage);
            socket.off("update_room", handleUpdateRoom);
            disconnectSocket();
        };
    }, [currentRoom]);
    // Quản lý danh sách ảnh đính kèm
    const [fileList, setFileList] = useState<UploadedFile[]>([]);
    // Xóa ảnh khỏi danh sách preview
    const handleRemoveImage = (uid: string) => {
        setFileList((prev) => prev.filter((item) => item.uid !== uid));
    };

    // Upload file lên server
    const handleCustomUpload = async ({ file, onSuccess, onError }: any) => {
        const fileItem: UploadedFile = {
            uid: file.uid,
            name: file.name,
            status: "uploading",
        };
        setFileList((prev) => {
            if (prev.length >= 10) {
                message.warning("Chỉ được tải lên tối đa 10 ảnh.");
                return prev;
            }
            return [...prev, fileItem];
        });
        try {
            const formData = new FormData();
            formData.append("images", file as Blob);

            const res = await privateAdmin.post("/admin/api/uploads/images", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const responseData = res.data?.data;
            let imageUrl = "";

            if (Array.isArray(responseData)) {
                imageUrl = responseData[0];
            } else if (Array.isArray(responseData?.urls)) {
                imageUrl = responseData.urls[0];
            } else {
                imageUrl = responseData?.urls || responseData?.url || responseData;
            }

            setFileList((prev) =>
                prev.map((item) =>
                    item.uid === file.uid
                        ? { ...item, status: "done", url: imageUrl }
                        : item
                )
            );

            onSuccess?.(res.data.data);
        } catch (err: any) {
            setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
            message.error(
                err?.response?.data?.message || "Upload thất bại, dung lượng phải nhỏ hơn 5MB."
            );
            onError?.(err as Error);
        }
    };

    // Gửi tin nhắn
    const handleSendMessage = (values: { message?: string }) => {
        const textContent = values.message?.trim() || "";

        const imageUrls = fileList
            .filter((f) => f.status === "done" && f.url)
            .map((f) => f.url);

        // Không cho gửi nếu không có cả chữ lẫn ảnh
        if (!textContent && imageUrls.length === 0) return;

        // Gửi payload lên Socket Server
        socket.emit("send_message", {
            message: textContent,
            images: imageUrls,
        });

        form.resetFields();
        setFileList([]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            form.submit();
        }
    };

    if (loading || !currentRoom) {
        return <LoadingScreen />;
    }

    if (error) {
        return <CustomAlert error={error} />;
    }

    if (!rooms || rooms.length === 0) {
        return (
            <div className="flex h-full items-center justify-center p-8 bg-white rounded-md">
                <Empty description="Chưa có cuộc trò chuyện nào" />
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-146px)] rounded-md shadow-sm w-full overflow-hidden bg-white text-gray-900">
            {/* Danh sách phòng chat */}
            <div className="flex w-80 min-w-[300px] flex-col border-r border-gray-200 bg-white">
                <div className="p-3.5 pb-2">
                    <h1 className="mb-2.5 text-xl font-bold tracking-tight text-gray-900">
                        Chat
                    </h1>
                    <Input
                        prefix={<SearchOutlined className="text-gray-400" />}
                        placeholder="Tìm kiếm trên Messenger"
                        className="!rounded-full !border-none !bg-gray-100 px-3.5 py-1.5 text-xs focus:!bg-white focus:!ring-1 focus:!ring-gray-300"
                    />
                </div>

                <div className="flex-1 overflow-y-auto px-2 py-1 [scrollbar-color:#d1d5db_transparent] [scrollbar-width:thin]">
                    {rooms.map((room) => {
                        const isActive = currentRoom._id === room._id;
                        return (
                            <div
                                key={room._id}
                                onClick={() => setCurrentRoom(room)}
                                className={`group relative mb-1 flex cursor-pointer items-center gap-3 rounded-xl p-2.5 transition-colors ${isActive ? "bg-gray-200/80 font-medium" : "hover:bg-gray-100"
                                    }`}
                            >
                                <div className="relative shrink-0">
                                    <Avatar
                                        size={48}
                                        src={room.userInfo.avatar ?? defaultAvatar}
                                    />
                                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="truncate text-sm font-semibold text-gray-800">
                                            {room.userInfo.fullName}
                                        </p>
                                        {room.lastMessage && (
                                            <span className="text-[11px] text-gray-400">
                                                {new Date(
                                                    room.lastMessage.createdAt
                                                ).toLocaleTimeString("vi-VN", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-0.5 flex items-center justify-between gap-1">
                                        <p
                                            className={`truncate text-xs ${room.unreadCount?.admin > 0
                                                    ? "font-semibold text-gray-800"
                                                    : "text-gray-500"
                                                }`}
                                        >
                                            {
                                                room.lastMessage?.role === "admin"
                                                    ? room.lastMessage?.message
                                                        ? `Bạn: ${room.lastMessage.message}`
                                                        : "Bạn: đã gửi ảnh"
                                                    : room.lastMessage?.message
                                                        ? room.lastMessage.message
                                                        : "Đã gửi ảnh"
                                            }
                                        </p>
                                        {room.unreadCount?.admin > 0 && (
                                            <Badge
                                                count={room.unreadCount?.admin}
                                                className="shrink-0"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Box chat tin nhắn */}
            <div className="flex flex-1 flex-col bg-white">
                {/* Header Chat */}
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2.5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Avatar
                                size={40}
                                src={currentRoom.userInfo.avatar ?? defaultAvatar}
                            />
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">
                                {currentRoom.userInfo.fullName}
                            </p>
                            <p className="text-[11px] text-gray-500">Đang hoạt động</p>
                        </div>
                    </div>
                </div>

                {/* Nội dung danh sách tin nhắn */}
                <div className="flex-1 space-y-2 overflow-y-auto p-4 [scrollbar-color:#d1d5db_transparent] [scrollbar-width:thin]">
                    {messages?.map((msg) => {
                        const isAdmin = msg.userID.accountType === "admin";
                        return (
                            <div
                                key={msg._id}
                                className={`flex items-end gap-2 mb-3 ${ isAdmin ? "justify-end" : "justify-start" }`}
                            >
                                {!isAdmin && (
                                    <Avatar size={32} src={currentRoom.userInfo.avatar ?? defaultAvatar} />
                                )}

                                <div className={`flex flex-col gap-2 ${ isAdmin ? "items-end" : "items-start" }`} >
                                    {msg.images.length > 0 && (
                                        <div
                                            className={`rounded-2xl p-2 ${ isAdmin ? "bg-blue-50" : "bg-gray-100 border border-gray-200" }`}
                                        >
                                            <div className="flex flex-wrap gap-2">
                                                {msg.images.map((imgUrl, index) => (
                                                    <div
                                                        key={index}
                                                        className="overflow-hidden rounded-xl"
                                                    >
                                                        <Image
                                                            src={imgUrl}
                                                            width={90}
                                                            height={90}
                                                            preview
                                                            style={{
                                                                objectFit: "cover",
                                                                borderRadius: 12,
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {msg.content && (
                                        <div
                                            className={`max-w-[360px] rounded-xl px-4 py-2.5 text-[14px] leading-6 transition-all ${
                                                isAdmin
                                                    ? "bg-blue-600 text-white rounded-br-md"
                                                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
                                            }`}
                                        >
                                            {msg.content}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* Khung xem trước ảnh (Chỉ hiển thị khi Upload xong & có URL) */}
                {fileList.length > 0 && (
                    <div className="flex items-center gap-3 border-t border-gray-100 bg-gray-50/80 px-4 py-2.5 overflow-x-auto">
                        {fileList.map((file) => (
                            <div
                                key={file.uid}
                                className="group relative h-16 w-16 shrink-0 rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm flex items-center justify-center"
                            >
                                {file.status === "done" && file.url ? (
                                    <img
                                        src={file.url}
                                        alt={file.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-gray-50">
                                        <Spin
                                            indicator={
                                                <LoadingOutlined className="text-lg text-blue-600" spin />
                                            }
                                        />
                                    </div>
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(file.uid)}
                                    className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900/70 text-white opacity-90 hover:bg-black transition-all z-10"
                                >
                                    <CloseOutlined className="text-[10px]" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Khung nhập tin nhắn & nút bấm */}
                <div className="flex items-center gap-2 border-t border-gray-100 p-3 bg-white">
                    <Upload
                        multiple
                        showUploadList={false}
                        customRequest={handleCustomUpload}
                        accept="image/*"
                    >
                        <Button
                            type="text"
                            shape="circle"
                            icon={<PaperClipOutlined className="text-lg text-blue-600" />}
                            className="hover:!bg-gray-100"
                        />
                    </Upload>

                    <Form
                        form={form}
                        onFinish={handleSendMessage}
                        className="flex flex-1 items-center gap-2"
                    >
                        <Form.Item name="message" className="!mb-0 flex-1">
                            <TextArea
                                autoSize={{ minRows: 1, maxRows: 4 }}
                                placeholder="Nhập tin nhắn..."
                                onKeyDown={handleKeyDown}
                                className="!rounded-2xl !border-none !bg-gray-100 px-4 py-2 text-xs focus:!bg-gray-100 focus:!outline-none"
                            />
                        </Form.Item>

                        <Button
                            type="text"
                            shape="circle"
                            icon={<SmileOutlined className="text-lg text-blue-600" />}
                            className="hover:!bg-gray-100"
                        />

                        <Button
                            htmlType="submit"
                            type="text"
                            shape="circle"
                            icon={<SendOutlined className="text-base text-blue-600" />}
                            className="hover:!bg-gray-100"
                        />
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ChatPageAdmin;