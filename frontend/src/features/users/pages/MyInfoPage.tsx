import React from "react";
import { useAppSelector } from "../../../app/hooks";

const MyInfoPage: React.FC = () => {
    const user = useAppSelector((state) => state.auth.user);

    if (!user) {
        return (
            <div className="py-12 text-center text-sm text-neutral-500 border border-dashed border-neutral-300 rounded-xl max-w-5xl mx-auto">
                Chưa có thông tin người dùng.
            </div>
        );
    }

    const firstLetter = user.fullName ? user.fullName.charAt(0).toUpperCase() : "U";

    return (
        <div className="flex flex-col gap-5 max-w-5xl mx-auto p-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-5 rounded-xl border border-neutral-300 bg-white">
                <div className="relative">
                    {user.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.fullName}
                            className="size-20 rounded-full object-cover border border-neutral-200 shrink-0"
                        />
                    ) : (
                        <div className="size-20 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center font-bold text-2xl border border-primary-200 shrink-0">
                            {firstLetter}
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left flex-1">
                    <h1 className="text-lg font-bold text-neutral-800 capitalize">
                        {user.fullName || "Chưa cập nhật tên"}
                    </h1>
                    <p className="text-sm text-neutral-500">{user.email}</p>
                </div>
            </div>

            <div className="rounded-xl border border-neutral-300 bg-white p-5 flex flex-col gap-4">
                <h2 className="text-sm font-bold text-neutral-800 border-b border-neutral-100 pb-3">
                    Thông tin cá nhân
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                    <div className="flex flex-col gap-1">
                        <span className="text-neutral-500 text-xs">Họ và tên</span>
                        <span className="font-semibold text-neutral-800 capitalize">
                            {user.fullName || "Chưa cập nhật"}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-neutral-500 text-xs">Địa chỉ Email</span>
                        <span className="font-semibold text-neutral-800">{user.email}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-neutral-500 text-xs">Số điện thoại</span>
                        <span className="font-semibold text-neutral-800">
                            {user.phone || "Chưa cập nhật"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyInfoPage;