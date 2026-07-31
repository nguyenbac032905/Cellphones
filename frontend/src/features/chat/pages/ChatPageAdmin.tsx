import { Avatar, Badge, Button, Form, Input, Upload } from "antd";
import {
    PaperClipOutlined,
    SearchOutlined,
    SendOutlined,
    SmileOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

const { TextArea } = Input;

// Dữ liệu giả lập danh sách cuộc trò chuyện
const roomsChat = [
    {
        roomChatID: "686111",
        userID: {
            fullName: "Nguyễn Văn A",
            avatar: "https://i.pravatar.cc/150?img=1",
            isOnline: true,
        },
        lastMessage: "Em muốn hỏi về đơn hàng ạ.",
        unreadCount: 2,
        time: "10:30",
    },
    {
        roomChatID: "686112",
        userID: {
            fullName: "Trần Thị B",
            avatar: "https://i.pravatar.cc/150?img=2",
            isOnline: false,
        },
        lastMessage: "Cảm ơn shop nhiều nhé!",
        unreadCount: 0,
        time: "09:15",
    },
    {
        roomChatID: "686113",
        userID: {
            fullName: "Lê Hoàng C",
            avatar: "https://i.pravatar.cc/150?img=3",
            isOnline: true,
        },
        lastMessage: "Shop còn mẫu này không?",
        unreadCount: 0,
        time: "Hôm qua",
    },
    {
        roomChatID: "686114",
        userID: {
            fullName: "Phạm Minh D",
            avatar: "https://i.pravatar.cc/150?img=4",
            isOnline: false,
        },
        lastMessage: "Đã nhận được hàng rồi ạ.",
        unreadCount: 1,
        time: "Hôm qua",
    },
    {
        roomChatID: "686115",
        userID: {
            fullName: "Hoàng Ngọc E",
            avatar: "https://i.pravatar.cc/150?img=5",
            isOnline: true,
        },
        lastMessage: "Tư vấn giúp em size áo với ạ.",
        unreadCount: 0,
        time: "2 ngày trước",
    },
    {
        roomChatID: "686116",
        userID: {
            fullName: "Vũ Khánh F",
            avatar: "https://i.pravatar.cc/150?img=6",
            isOnline: false,
        },
        lastMessage: "Dạ vâng shop.",
        unreadCount: 0,
        time: "3 ngày trước",
    },
    {
        roomChatID: "686117",
        userID: {
            fullName: "Đỗ Quốc G",
            avatar: "https://i.pravatar.cc/150?img=7",
            isOnline: true,
        },
        lastMessage: "Bao giờ giao hàng vậy shop?",
        unreadCount: 3,
        time: "08:10",
    },
    {
        roomChatID: "686118",
        userID: {
            fullName: "Ngô Thị H",
            avatar: "https://i.pravatar.cc/150?img=8",
            isOnline: false,
        },
        lastMessage: "Shop kiểm tra giúp em.",
        unreadCount: 0,
        time: "07:25",
    },
    {
        roomChatID: "686119",
        userID: {
            fullName: "Bùi Minh I",
            avatar: "https://i.pravatar.cc/150?img=9",
            isOnline: true,
        },
        lastMessage: "Có freeship không ạ?",
        unreadCount: 5,
        time: "Hôm nay",
    },
    {
        roomChatID: "686120",
        userID: {
            fullName: "Lý Thanh K",
            avatar: "https://i.pravatar.cc/150?img=10",
            isOnline: false,
        },
        lastMessage: "Em vừa chuyển khoản.",
        unreadCount: 0,
        time: "Hôm nay",
    },
    {
        roomChatID: "686121",
        userID: {
            fullName: "Phan Quốc L",
            avatar: "https://i.pravatar.cc/150?img=11",
            isOnline: true,
        },
        lastMessage: "Shop xác nhận đơn giúp em.",
        unreadCount: 1,
        time: "11:45",
    },
    {
        roomChatID: "686122",
        userID: {
            fullName: "Mai Thu M",
            avatar: "https://i.pravatar.cc/150?img=12",
            isOnline: true,
        },
        lastMessage: "Màu trắng còn hàng không?",
        unreadCount: 0,
        time: "Hôm qua",
    },
    {
        roomChatID: "686123",
        userID: {
            fullName: "Đặng Hải N",
            avatar: "https://i.pravatar.cc/150?img=13",
            isOnline: false,
        },
        lastMessage: "Em đã nhận được mã giảm giá.",
        unreadCount: 0,
        time: "2 ngày trước",
    },
    {
        roomChatID: "686124",
        userID: {
            fullName: "Trịnh Văn O",
            avatar: "https://i.pravatar.cc/150?img=14",
            isOnline: true,
        },
        lastMessage: "Shop phản hồi giúp em.",
        unreadCount: 4,
        time: "09:50",
    },
    {
        roomChatID: "686125",
        userID: {
            fullName: "Tạ Minh P",
            avatar: "https://i.pravatar.cc/150?img=15",
            isOnline: false,
        },
        lastMessage: "Ok shop nhé.",
        unreadCount: 0,
        time: "3 ngày trước",
    },
    {
        roomChatID: "686126",
        userID: {
            fullName: "Hồ Thanh Q",
            avatar: "https://i.pravatar.cc/150?img=16",
            isOnline: true,
        },
        lastMessage: "Cho em đổi địa chỉ nhận hàng.",
        unreadCount: 2,
        time: "12:15",
    },
    {
        roomChatID: "686127",
        userID: {
            fullName: "Chu Đức R",
            avatar: "https://i.pravatar.cc/150?img=17",
            isOnline: false,
        },
        lastMessage: "Shop tư vấn giúp em.",
        unreadCount: 0,
        time: "Hôm qua",
    },
    {
        roomChatID: "686128",
        userID: {
            fullName: "Lâm Quốc S",
            avatar: "https://i.pravatar.cc/150?img=18",
            isOnline: true,
        },
        lastMessage: "Sản phẩm đẹp lắm ạ.",
        unreadCount: 1,
        time: "08:45",
    },
    {
        roomChatID: "686129",
        userID: {
            fullName: "Kiều Thị T",
            avatar: "https://i.pravatar.cc/150?img=19",
            isOnline: false,
        },
        lastMessage: "Em sẽ đặt thêm đơn.",
        unreadCount: 0,
        time: "4 ngày trước",
    },
    {
        roomChatID: "686130",
        userID: {
            fullName: "Dương Văn U",
            avatar: "https://i.pravatar.cc/150?img=20",
            isOnline: true,
        },
        lastMessage: "Cảm ơn shop rất nhiều.",
        unreadCount: 6,
        time: "Vừa xong",
    },
];

// Dữ liệu giả lập tin nhắn
const initialMessages = [
    {
        _id: "1",
        accountType: "user",
        fullName: "Nguyễn Văn A",
        message: "Xin chào shop ạ!",
        time: "10:28",
    },
    {
        _id: "2",
        accountType: "admin",
        fullName: "Admin",
        message: "Chào bạn, shop có thể hỗ trợ gì cho bạn ạ?",
        time: "10:29",
    },
    {
        _id: "3",
        accountType: "user",
        fullName: "Nguyễn Văn A",
        message: "Dạ em muốn kiểm tra tiến độ giao hàng của đơn #686111.",
        time: "10:30",
    },
    {
        _id: "4",
        accountType: "admin",
        fullName: "Admin",
        message: "Shop đã kiểm tra, đơn của bạn đang được bên vận chuyển lấy hàng.",
        time: "10:31",
    },
    {
        _id: "5",
        accountType: "user",
        fullName: "Nguyễn Văn A",
        message: "Khoảng bao giờ em sẽ nhận được hàng vậy ạ?",
        time: "10:32",
    },
    {
        _id: "6",
        accountType: "admin",
        fullName: "Admin",
        message: "Dự kiến trong khoảng 2 ngày nữa bạn sẽ nhận được nhé.",
        time: "10:33",
    },
    {
        _id: "7",
        accountType: "user",
        fullName: "Nguyễn Văn A",
        message: "Nếu em đổi địa chỉ nhận hàng thì có được không ạ?",
        time: "10:34",
    },
    {
        _id: "8",
        accountType: "admin",
        fullName: "Admin",
        message: "Nếu đơn chưa giao cho bưu tá thì shop có thể hỗ trợ đổi địa chỉ.",
        time: "10:35",
    },
    {
        _id: "9",
        accountType: "user",
        fullName: "Nguyễn Văn A",
        message: "Địa chỉ mới của em là Cầu Giấy, Hà Nội.",
        time: "10:36",
    },
    {
        _id: "10",
        accountType: "admin",
        fullName: "Admin",
        message: "Bạn vui lòng gửi đầy đủ số nhà và số điện thoại giúp shop nhé.",
        time: "10:37",
    },
    {
        _id: "11",
        accountType: "user",
        fullName: "Nguyễn Văn A",
        message: "Số 12 ngõ 34, đường Trần Thái Tông, Cầu Giấy.",
        time: "10:38",
    },
    {
        _id: "12",
        accountType: "admin",
        fullName: "Admin",
        message: "Shop đã ghi nhận địa chỉ mới của bạn.",
        time: "10:39",
    },
    {
        _id: "13",
        accountType: "user",
        fullName: "Nguyễn Văn A",
        message: "Em có cần trả thêm phí vận chuyển không ạ?",
        time: "10:40",
    },
    {
        _id: "14",
        accountType: "admin",
        fullName: "Admin",
        message: "Không phát sinh thêm phí bạn nhé.",
        time: "10:41",
    },
    {
        _id: "15",
        accountType: "user",
        fullName: "Nguyễn Văn A",
        message: "Dạ vâng, cảm ơn shop nhiều.",
        time: "10:42",
    },
    {
        _id: "16",
        accountType: "admin",
        fullName: "Admin",
        message: "Không có gì ạ, rất vui được hỗ trợ bạn.",
        time: "10:43",
    },
    {
        _id: "17",
        accountType: "user",
        fullName: "Nguyễn Văn A",
        message: "Khi nào giao thành công shop báo giúp em nhé.",
        time: "10:44",
    },
    {
        _id: "18",
        accountType: "admin",
        fullName: "Admin",
        message: "Vâng ạ, shop sẽ cập nhật trạng thái ngay khi có thông tin mới.",
        time: "10:45",
    },
    {
        _id: "19",
        accountType: "user",
        fullName: "Nguyễn Văn A",
        message: "Cảm ơn shop, chúc shop nhiều khách nhé ❤️",
        time: "10:46",
    },
    {
        _id: "20",
        accountType: "admin",
        fullName: "Admin",
        message: "Shop cảm ơn bạn rất nhiều. Chúc bạn một ngày tốt lành! 😊",
        time: "10:47",
    },
];

const ChatPageAdmin = () => {
    const [form] = Form.useForm();
    const [currentRoom, setCurrentRoom] = useState(roomsChat[0]);
    const [messagesList, setMessagesList] = useState(initialMessages);

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
    }, [messagesList]);

    // xử lý gửi tin nhắn
    const handleSendMessage = (values: { message?: string }) => {
        if (!values.message || !values.message.trim()) return;

        const newMessage = {
            _id: Date.now().toString(),
            accountType: "admin",
            fullName: "Admin",
            message: values.message,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessagesList((prev) => [...prev, newMessage]);
        form.resetFields();
    };

    // hàm nhấn enter để gửi tin nhắn
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            form.submit();
        }
    };
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
                    {roomsChat.map((room) => {
                        const isActive = currentRoom.roomChatID === room.roomChatID;
                        return (
                            <div
                                key={room.roomChatID}
                                onClick={() => setCurrentRoom(room)}
                                className={`group relative mb-1 flex cursor-pointer items-center gap-3 rounded-xl p-2.5 transition-colors 
                                        ${isActive? 
                                        "bg-gray-200/80 font-medium"
                                        : "hover:bg-gray-100"
                                    }`}
                            >
                                <div className="relative shrink-0">
                                    <Avatar size={48} src={room.userID.avatar} />
                                    {room.userID.isOnline && (
                                        <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="truncate text-sm font-semibold text-gray-900">
                                            {room.userID.fullName}
                                        </p>
                                        <span className="text-[11px] text-gray-400">{room.time}</span>
                                    </div>
                                    <div className="mt-0.5 flex items-center justify-between gap-1">
                                        <p
                                            className={`truncate text-xs 
                                                    ${isActive || room.unreadCount > 0
                                                    ? "font-semibold text-gray-800"
                                                    : "text-gray-500"
                                                }`}
                                        >
                                            {room.lastMessage}
                                        </p>
                                        {room.unreadCount > 0 && !isActive && (
                                            <Badge count={room.unreadCount} className="shrink-0" />
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
                            <Avatar size={40} src={currentRoom.userID.avatar} />
                            {currentRoom.userID.isOnline && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">{currentRoom.userID.fullName}</p>
                            <p className="text-[11px] text-gray-500">
                                {currentRoom.userID.isOnline ? "Đang hoạt động" : "Dừng hoạt động"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 space-y-2 overflow-y-auto p-4 [scrollbar-color:#d1d5db_transparent] [scrollbar-width:thin]">
                    {messagesList.map((msg) => {
                        const isAdmin = msg.accountType === "admin";
                        return (
                            <div
                                key={msg._id}
                                className={`flex items-end gap-2 ${isAdmin ? "justify-end" : "justify-start"
                                    }`}
                            >
                                {!isAdmin && (
                                    <Avatar size={28} src={currentRoom.userID.avatar} className="mb-1" />
                                )}
                                <div
                                    className={`max-w-[65%] break-words rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${isAdmin
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-900"
                                        }`}
                                >
                                    {msg.message}
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