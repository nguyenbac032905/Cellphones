import { useState } from "react";
import { CustomerServiceOutlined } from "@ant-design/icons";
import ChatBox from "../../features/chat/components/ChatBox";

const ChatWidget = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {open && <ChatBox setOpen={setOpen} />}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className=" flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2.5 text-white shadow-md transition-colors hover:bg-primary-600 "
            >
                <span className="text-sm font-medium">
                    Liên hệ
                </span>
                <CustomerServiceOutlined className="text-lg" />
            </button>
        </div>
    );
};

export default ChatWidget;