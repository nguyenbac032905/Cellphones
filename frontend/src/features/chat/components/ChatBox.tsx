import { Avatar, Button, Form, Image, Spin, Tooltip, Upload, message } from "antd";
import { CloseOutlined, LoadingOutlined, PaperClipOutlined, SendOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { connectSocket, disconnectSocket, socket } from "../../../sockets/socket";
import { useRoom } from "../hooks/useRoom";
import TextArea from "antd/es/input/TextArea";
import { useMessages } from "../hooks/useMessages";
import type { IChatMessage } from "../types/chatAdmin.type";
import { privateClient } from "../../../shared/api/privateClient";
import type { UploadedFile } from "../pages/ChatPageAdmin";

const ChatBox = ({ setOpen }: { setOpen: (state: boolean) => void }) => {
    const [form] = Form.useForm();
    const { room } = useRoom();
    const { messages, setMessages } = useMessages(room?._id || "");
    const messageEndRef = useRef<HTMLDivElement>(null);

    // Quản lý danh sách ảnh đính kèm
    const [fileList, setFileList] = useState<UploadedFile[]>([]);

    // Hàm cuộn xuống tin nhắn cuối cùng
    const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
        messageEndRef.current?.scrollIntoView({ behavior });
    };

    // Cuộn mượt xuống dưới cùng khi có tin nhắn mới
    useEffect(() => {
        scrollToBottom("auto");
    }, [messages]);

    useEffect(() => {
        if (!room) return;

        const handleConnect = () => {
            socket.emit("join_room", room._id, (res: any) => {
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

        connectSocket();

        return () => {
            socket.off("connect", handleConnect);
            socket.off("receive_message", handleReceiveMessage);
            disconnectSocket();
        };
    }, [room]);

    // Xóa ảnh khỏi danh sách preview
    const handleRemoveImage = (uid: string) => {
        setFileList((prev) => prev.filter((item) => item.uid !== uid));
    };

    // Upload file lên server
    const handleCustomUpload = async ({ file, onSuccess, onError }: any) => {
        if (fileList.length >= 10) {
            message.warning("Chỉ được tải lên tối đa 10 ảnh.");
            return;
        }

        // Tạo blob preview tạm thời trước khi upload xong
        const previewUrl = URL.createObjectURL(file as Blob);

        const fileItem: UploadedFile = {
            uid: file.uid,
            name: file.name,
            status: "uploading",
            url: previewUrl,
        };

        setFileList((prev) => [...prev, fileItem]);

        try {
            const formData = new FormData();
            formData.append("images", file as Blob);

            const res = await privateClient.post("/api/uploads/images", formData, {
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

    const handleSendMessage = (values: { message?: string }) => {
        const textContent = values.message?.trim() || "";

        const isUploading = fileList.some((f) => f.status === "uploading");
        if (isUploading) {
            message.warning("Vui lòng đợi ảnh tải lên hoàn tất.");
            return;
        }

        const imageUrls = fileList
            .filter((f) => f.status === "done" && f.url)
            .map((f) => f.url);

        if (!textContent && imageUrls.length === 0) return;

        socket.emit("send_message", {
            message: textContent,
            images: imageUrls,
        });

        form.resetFields();
        setFileList([]);
    };

    // Hàm nhấn Enter để gửi tin nhắn
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            form.submit();
        }
    };

    return (
        <div className="flex h-[480px] w-[340px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
            {/* Header */}
            <div className="flex items-start justify-between bg-primary-500 px-4 py-3 text-white">
                <div className="flex items-center gap-3">
                    <Avatar
                        size={35}
                        src="https://file2.caresoft.vn/dl/00A7P4Z5PVFB3FH4KHFA0XR2XY/78d9758a49fe9b021883c1c65f100265/00A7P4Z5PVFB3FH4KHFA0XR2XY.png"
                    />
                    <div>
                        <p className="font-semibold">Xin chào!</p>
                        <p className="text-xs text-white/90">
                            Em ở đây để hỗ trợ cho mình ạ.
                        </p>
                    </div>
                </div>

                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    className="!text-white hover:!bg-white/10"
                    onClick={() => setOpen(false)}
                />
            </div>

            {/* Messages Body */}
            <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-3">
                {messages.map((msg) => {
                    const isUser = msg.userID?.accountType === "user";
                    return (
                        <div
                            key={msg._id}
                            className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
                        >
                            <div className="max-w-[80%]">
                                {!isUser && (
                                    <p className="mb-1 ml-1 text-xs font-medium text-gray-500">
                                        {msg.userID?.fullName}
                                    </p>
                                )}

                                <div className={`flex flex-col gap-2 ${ isUser ? "items-end" : "items-start" }`}>
                                    {msg.images?.length > 0 && (
                                        <div
                                            className={`rounded-2xl p-2 ${
                                                isUser
                                                    ? "bg-blue-50"
                                                    : "bg-gray-100 border border-gray-200"
                                            }`}
                                        >
                                            <div className="flex flex-wrap gap-2" >
                                                <Image.PreviewGroup>
                                                    {msg.images.map((imgUrl, idx) => (
                                                        <div
                                                            key={idx}
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
                                                </Image.PreviewGroup>
                                            </div>
                                        </div>
                                    )}

                                    {msg.content && (
                                        <div
                                            className={`max-w-[360px] rounded-xl px-4 py-2.5 text-[14px] leading-6 transition-all ${
                                                isUser
                                                    ? "bg-primary-500 text-white rounded-br-md"
                                                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
                                            }`}
                                        >
                                            {msg.content}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messageEndRef} />
            </div>

            {/* Area Preview ảnh đính kèm trước khi gửi */}
            {fileList.length > 0 && (
                <div className="flex gap-2 overflow-x-auto border-t border-gray-100 bg-gray-50 p-2">
                    {fileList.map((item) => (
                        <div key={item.uid} className="relative h-14 w-14 flex-shrink-0 rounded-lg border border-gray-200 bg-white">
                            <img
                                src={item.url}
                                alt={item.name}
                                className="h-full w-full rounded-lg object-cover"
                            />
                            {item.status === "uploading" && (
                                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40">
                                    <Spin indicator={<LoadingOutlined className="text-white" style={{ fontSize: 16 }} spin />} />
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(item.uid)}
                                className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-red-500"
                            >
                                <CloseOutlined className="text-[10px]" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Input Form */}
            <div className="border-t border-gray-200 bg-white p-2.5">
                <Form
                    form={form}
                    onFinish={handleSendMessage}
                    className="flex items-center gap-2"
                >
                    <Tooltip title="Gửi ảnh">
                        <Upload
                            multiple
                            showUploadList={false}
                            customRequest={handleCustomUpload}
                            accept="image/*"
                        >
                            <Button
                                type="text"
                                icon={<PaperClipOutlined />}
                                className="hover:!text-primary-500"
                            />
                        </Upload>
                    </Tooltip>

                    <Form.Item
                        name="message"
                        className="!mb-0 flex-1"
                    >
                        <TextArea
                            autoSize={{
                                minRows: 1,
                                maxRows: 4,
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Nhập tin nhắn..."
                            className="!rounded-lg"
                        />
                    </Form.Item>

                    <Button
                        htmlType="submit"
                        type="primary"
                        shape="circle"
                        icon={<SendOutlined />}
                        className="!bg-primary-500 hover:!bg-primary-600"
                    />
                </Form>
            </div>
        </div>
    );
};

export default ChatBox;