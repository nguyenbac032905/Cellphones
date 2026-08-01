import { Avatar, Badge, Button, Empty, Form, Input, Upload } from "antd";
import { PaperClipOutlined, SearchOutlined, SendOutlined, SmileOutlined, } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useRoomsAdmin } from "../hooks/useRoomsAdmin";
import LoadingScreen from "../../../shared/components/LoadingScreen";
import CustomAlert from "../../../shared/components/CustomAlert";
import type { IChatMessage, RoomAdmin } from "../types/chatAdmin.type";
import { useMessagesAdmin } from "../hooks/useMessagesAdmin";
import { connectSocket, disconnectSocket, socket } from "../../../sockets/socket";
const { TextArea } = Input;

const ChatPageAdmin = () => {
    const [form] = Form.useForm();
    const {rooms, setRooms, loading, error} = useRoomsAdmin();
    const [currentRoom, setCurrentRoom] = useState<RoomAdmin | null>(null);
    const {messages, setMessages} = useMessagesAdmin(currentRoom?._id ?? "");
    const defaultAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePQrmECqQyT4U2vF38XPiBEyF95GRpEgoTriZ3laX_7ce0_An2KeSQlE&s=10";
    useEffect(() => {
        if (rooms.length > 0 && currentRoom === null) {
            setCurrentRoom(rooms[0]);
        }

    }, [rooms, currentRoom]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    // hàm cuộn xuống tin nhắn cuối cùng
    const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
        messagesEndRef.current?.scrollIntoView({ behavior });
    };

    // cuộn xuống tin nhắn cuối cùng khi người dùng chọn room khác
    useEffect(() => {
        scrollToBottom("auto");
    }, [currentRoom]);

    // cuộn mượt xuống dưới cùng khi có tin nhắn mới
    useEffect(() => {
        scrollToBottom("smooth");
    }, [messages]);
    //xử lí tin nhắn realtime
    useEffect(() => {
        if (!currentRoom) return;
        // bắt sự kiện khi socket kết nối với backend
        const handleConnect = () => {
            socket.emit("join_room", currentRoom._id, (res: any) => {
                if(res.success){
                    console.log("Đã join room");
                }else{
                    console.log(res.message)
                }
            });
        };
        socket.on("connect", handleConnect);
        // bắt sự kiện backend trả về tin nhắn
        const handleReceiveMessage = (message: IChatMessage) => {
            setMessages(prev => [...prev, message]);
        }
        socket.on("receive_message", handleReceiveMessage);
        //xử lí khi có tin nhắn mới
        const handleUpdateRoom = (data: { roomID: string; lastMessage: { message: string; role: "admin" | "user"; createdAt: string; }; }) => {
            setRooms((prev) =>
                prev.map((room) => {
                    if (room._id !== data.roomID) return room;
                    const isCurrentRoom = currentRoom._id === data.roomID;
                    return {
                        ...room,
                        lastMessage: data.lastMessage,
                        unreadCount: isCurrentRoom
                            ? room.unreadCount
                            : {
                                ...room.unreadCount,
                                admin:
                                    data.lastMessage.role === "user"
                                        ? room.unreadCount.admin + 1
                                        : room.unreadCount.admin,
                            },
                    };
                })
            );
        };
        socket.on("update_room", handleUpdateRoom);
        // gọi hàm kết nối socketIO với backend
        connectSocket();

        return () => {
            // hủy kết nối khi không dùng đến nữa
            socket.off("connect", handleConnect);
            socket.off("receive_message", handleReceiveMessage);
            socket.off("update_room", handleUpdateRoom);
            disconnectSocket();
        };
    }, [currentRoom]);
    // xử lý gửi tin nhắn
    const handleSendMessage = (values: { message?: string }) => {
        if (!values.message || !values.message.trim()) return;
        socket.emit("send_message",values.message);
        form.resetFields();
    };

    // hàm nhấn enter để gửi tin nhắn
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            form.submit();
        }
    };
    if(loading || !currentRoom) {
        return <LoadingScreen />
    }
    if(error){
        return <CustomAlert error={error}/>
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
            {/*Danh sách user */}
            <div className="flex w-80 min-w-[300px] flex-col border-r border-gray-200 bg-white">
                <div className="p-3.5 pb-2">
                    <h1 className="mb-2.5 text-xl font-bold tracking-tight text-gray-900">Chat</h1>
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
                                className={`group relative mb-1 flex cursor-pointer items-center gap-3 rounded-xl p-2.5 transition-colors 
                                        ${isActive? 
                                        "bg-gray-200/80 font-medium"
                                        : "hover:bg-gray-100"
                                    }`}
                            >
                                <div className="relative shrink-0">
                                    <Avatar size={48} src={room.userInfo.avatar ?? defaultAvatar} />
                                    {true && (
                                        <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="truncate text-sm font-semibold text-gray-800">
                                            {room.userInfo.fullName}
                                        </p>
                                        {room.lastMessage && (
                                            <span className="text-[11px] text-gray-400">
                                                {new Date(room.lastMessage.createdAt).toLocaleTimeString("vi-VN", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-0.5 flex items-center justify-between gap-1">
                                        <p
                                            className={`truncate text-xs 
                                                    ${room.unreadCount?.admin > 0
                                                    ? "font-semibold text-gray-800"
                                                    : "text-gray-500"
                                                }`}
                                        >
                                            {room.lastMessage?.role === "admin" ? `Bạn: ${room.lastMessage?.message}` : (room.lastMessage?.message)}
                                        </p>
                                        {room.unreadCount?.admin > 0 && (
                                            <Badge count={room.unreadCount?.admin} className="shrink-0" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* box chat tin nhắn */}
            <div className="flex flex-1 flex-col bg-white">
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2.5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Avatar size={40} src={currentRoom.userInfo.avatar ?? defaultAvatar} />
                            {true && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">{currentRoom.userInfo.fullName}</p>
                            <p className="text-[11px] text-gray-500">
                                {true ? "Đang hoạt động" : "Dừng hoạt động"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 space-y-2 overflow-y-auto p-4 [scrollbar-color:#d1d5db_transparent] [scrollbar-width:thin]">
                    {messages?.map((msg) => {
                        const isAdmin = msg.userID.accountType === "admin";
                        return (
                            <div
                                key={msg._id}
                                className={`flex items-end gap-2 ${isAdmin ? "justify-end" : "justify-start"
                                    }`}
                            >
                                {!isAdmin && (
                                    <Avatar size={28} src={currentRoom.userInfo.avatar ?? defaultAvatar} className="mb-1" />
                                )}
                                <div
                                    className={`max-w-[65%] break-words rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${isAdmin
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-900"
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        );
                    })}
                    {/* mốc để tự động scroll xuống dưới cùng */}
                    <div ref={messagesEndRef} />
                </div>

                <div className="flex items-center gap-2 border-t border-gray-100 p-3">
                    <Upload showUploadList={false} beforeUpload={() => false}>
                        <Button
                            type="text"
                            shape="circle"
                            icon={<PaperClipOutlined className="text-lg text-blue-600" />}
                            className="hover:!bg-gray-100"
                        />
                    </Upload>

                    <Form form={form} onFinish={handleSendMessage} className="flex flex-1 items-center gap-2">
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