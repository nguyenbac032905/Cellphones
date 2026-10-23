import { Dropdown } from "antd";
import { ArrowDownIcon, LocationIcon, LocationMobileIcon } from "../../shared/components/Icons";
import { useBranches } from "../../features/branches/hooks/useBranches";

interface BranchDropdownProps {
    variant: "desktop" | "mobile";
}

const BranchDropdown = ({ variant }: BranchDropdownProps) => {
    // autoFetch chỉ bật ở bản desktop để không gọi API 2 lần (2 bản đều được render cùng lúc)
    const { branches, branchId, selectedBranch, selectBranch } = useBranches(variant === "desktop");
    const branchName = selectedBranch?.name || "Hà Nội";

    const menu = {
        items: branches.map((item) => ({
            key: item._id,
            label: (
                <div className="flex flex-col py-0.5">
                    <span className="text-sm font-semibold">{item.name}</span>
                    {item.address && <span className="text-xs text-neutral-500">{item.address}</span>}
                </div>
            ),
        })),
        selectable: true,
        selectedKeys: [branchId],
        onClick: ({ key }: { key: string }) => selectBranch(key),
    };

    return (
        <Dropdown menu={menu} trigger={["click"]} placement="bottomLeft">
            {variant === "desktop" ? (
                <button className="bg-primary-300 hover:bg-primary-500 hidden items-center justify-center gap-1 cursor-pointer border-none text-base px-4 py-1 min-h-[40px] rounded-lg text-white h-10 md:flex">
                    <LocationIcon />
                    <span>{branchName}</span>
                    <ArrowDownIcon />
                </button>
            ) : (
                <button className="bg-primary-300 hover:bg-primary-500 flex items-center justify-center gap-1 cursor-pointer border-none text-white h-10 px-2 rounded-lg md:hidden">
                    <LocationMobileIcon />
                    <div className="flex flex-col items-start leading-tight">
                        <span className="text-[9px] opacity-80">Xem giá tại</span>
                        <span className="text-xs font-semibold">{branchName}</span>
                    </div>
                </button>
            )}
        </Dropdown>
    );
};

export default BranchDropdown;
