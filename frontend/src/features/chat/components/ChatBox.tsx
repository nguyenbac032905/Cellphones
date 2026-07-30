import { Avatar, Button, Input, Tooltip, Upload, } from "antd";
import { CloseOutlined, PaperClipOutlined, SendOutlined, } from "@ant-design/icons";

const messages = [
    {
        id: 1,
        sender: "staff",
        staffName: "Linh",
        content: "Xin chào 👋 Mình có thể hỗ trợ gì cho bạn?",
    },
    {
        id: 2,
        sender: "staff",
        staffName: "Linh",
        content: "Bạn cứ để lại câu hỏi, mình sẽ kiểm tra giúp nhé.",
    },
    {
        id: 3,
        sender: "user",
        content: "Cho mình hỏi iPhone 17 Pro Max còn hàng ở Hà Nội không ạ?",
    },
    {
        id: 4,
        sender: "staff",
        staffName: "Hoàng",
        content: "Dạ em kiểm tra giúp anh ngay ạ.",
    },
];

const ChatBox = ({ setOpen, }: { setOpen: (state: boolean) => void; }) => {
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
                    if (message.sender === "staff") {
                        return (
                            <div key={message.id} className="flex justify-start">
                                <div className="max-w-[75%]">
                                    <p className="mb-1 ml-1 text-xs font-medium text-gray-500">
                                        {message.staffName}
                                    </p>

                                    <div className="rounded-xl rounded-bl-md border border-gray-200 bg-white px-4 py-2 text-sm leading-6 text-gray-700">
                                        {message.content}
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div key={message.id} className="flex justify-end">
                            <div className="max-w-[75%] rounded-xl rounded-br-md bg-primary-500 px-4 py-2 text-sm leading-6 text-white">
                                {message.content}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="border-t border-gray-200 bg-white p-3">
                <div className="flex items-end gap-2">
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

                    <Input.TextArea
                        autoSize={{
                            minRows: 1,
                            maxRows: 4,
                        }}
                        placeholder="Nhập tin nhắn..."
                        className="!rounded-lg"
                    />

                    <Button
                        type="primary"
                        shape="circle"
                        icon={<SendOutlined />}
                        className="!bg-primary-500 hover:!bg-primary-600"
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatBox;