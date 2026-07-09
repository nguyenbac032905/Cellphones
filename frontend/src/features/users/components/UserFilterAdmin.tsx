import { useState } from "react";
import { Card, Input, Select } from "antd";
import { FilterOutlined, ReloadOutlined, } from "@ant-design/icons";
import type { UserQuery } from "../types/users.type";
const { Search } = Input;

type Props = {
    query: UserQuery;
    updateQuery: (values: Partial<UserQuery>) => void;
};

const UserFilterAdmin = ({ query, updateQuery }: Props) => {
    const [keyword, setKeyword] = useState(query.search || "");

    return (
        <Card
    variant="borderless"
    className="rounded-2xl shadow-sm"
    styles={{ body: { padding: 0 } }}
>
    <div className="flex flex-col xl:flex-row">

        {/* Filter */}
        <div className="flex flex-col sm:flex-row xl:border-r border-gray-200">

            {/* chỉ hiện trên desktop */}
            <div className="hidden xl:flex items-center justify-center gap-2 px-6 border-r border-gray-200">
                <FilterOutlined className="text-lg" />
                <span className="font-semibold">Filter</span>
            </div>

            <div className="flex-1 sm:min-w-[220px] px-4 py-4 sm:border-r border-gray-200 flex items-center">
                <Select
                    variant="borderless"
                    className="w-full"
                    value={query.status}
                    placeholder="Status"
                    onChange={(value) =>
                        updateQuery({
                            status: value,
                            page: 1,
                        })
                    }
                    options={[
                        { value: "", label: "All Status" },
                        { value: "active", label: "Active" },
                        { value: "inactive", label: "Inactive" },
                    ]}
                />
            </div>

            <div className="flex-1 sm:min-w-[220px] px-4 py-4 flex items-center">
                <Select
                    variant="borderless"
                    className="w-full"
                    value={query.accountType}
                    placeholder="Account Type"
                    onChange={(value) =>
                        updateQuery({
                            accountType: value,
                            page: 1,
                        })
                    }
                    options={[
                        { value: "", label: "All Account Types" },
                        { value: "admin", label: "Admin" },
                        { value: "user", label: "User" },
                    ]}
                />
            </div>
        </div>

        {/* Search + Reset */}
        <div className="flex flex-1 items-center border-t xl:border-t-0 xl:border-l border-gray-200">

            <div className="flex-1 p-4">
                <Search
                    placeholder="Search users..."
                    allowClear
                    size="large"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onSearch={(value) =>
                        updateQuery({
                            search: value,
                            page: 1,
                        })
                    }
                />
            </div>

            <button
                onClick={() => {
                    setKeyword("");
                    updateQuery({
                        status: "",
                        accountType: "",
                        search: "",
                        page: 1,
                    });
                }}
                className="h-full px-6 flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 transition border-l border-gray-200"
            >
                <ReloadOutlined />
                <span className="hidden sm:inline">Reset</span>
            </button>
        </div>

    </div>
</Card>
    );
};

export default UserFilterAdmin;