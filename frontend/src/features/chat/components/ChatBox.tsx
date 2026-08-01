import { Avatar, Button, Form, Input, Tooltip, Upload, } from "antd";
import { CloseOutlined, PaperClipOutlined, SendOutlined, } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { connectSocket, disconnectSocket, socket } from "../../../sockets/socket";
import { useRoom } from "../hooks/useRoom";
import TextArea from "antd/es/input/TextArea";
import { useMessages } from "../hooks/useMessages";
import type { IChatMessage } from "../types/chatAdmin.type";
const ChatBox = ({ setOpen, }: { setOpen: (state: boolean) => void; }) => {
    const [form] = Form.useForm();
    const { room } = useRoom();
    const {messages, setMessages} = useMessages(room?._id || "");
    useEffect(() => {
        if (!room) return;
        // bắt sự kiện khi socket kết nối với backend
        const handleConnect = () => {
            socket.emit("join_room", room._id, (res: any) => {
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

        // gọi hàm kết nối socketIO với backend
        connectSocket();

        return () => {
            // hủy kết nối khi không dùng đến nữa
            socket.off("connect", handleConnect);
            socket.off("receive_message", handleReceiveMessage);
            disconnectSocket();
        };
    }, [room]);
    const handleSendMessage = (values: {message: string}) => {
        socket.emit("send_message",values.message);
        form.resetFields();
    }
    return (
        <div className="flex h-[430px] w-[320px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
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
            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-2">
                {messages.map((message) => {
                    if (message.userID.accountType === "admin") {
                        return (
                            <div key={message._id} className="flex justify-start">
                                <div className="max-w-[75%]">
                                    <p className="mb-1 ml-1 text-xs font-medium text-gray-500">
                                        {message.userID.fullName}
                                    </p>

                                    <div className="rounded-xl rounded-bl-md border border-gray-200 bg-white px-4 py-2 text-sm leading-6 text-gray-700">
                                        {message.content}
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div key={message._id} className="flex justify-end">
                            <div className="max-w-[75%] rounded-xl rounded-br-md bg-primary-500 px-4 py-2 text-sm leading-6 text-white">
                                {message.content}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="border-t border-gray-200 bg-white p-3">
                <Form
                    form={form}
                    onFinish={handleSendMessage}
                    className="flex items-center gap-2"
                >
                    <Tooltip title="Gửi ảnh">
                        <Upload
                            showUploadList={false}
                            beforeUpload={() => false}
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
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: "Vui lòng nhập tin nhắn",
                            },
                        ]}
                    >
                        <TextArea
                            autoSize={{
                                minRows: 1,
                                maxRows: 4,
                            }}
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