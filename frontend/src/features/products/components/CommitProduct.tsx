import { ChipIcon, PhoneCheckIcon, ShieldCheckIcon, TagIcon } from "../../../shared/components/Icons";

const CommitProduct = () => {
    return (
        <div className="grid grid-cols-2 gap-2 min-h-[300px]">
            <div className="col-span-2 text-lg font-semibold">Cam kết sản phẩm</div>
            <div className="bg-[#f7f7f8] rounded-xl h-[calc(100% - 8px)] p-4">
                <div className="flex items-start gap-2 flex-col">
                    <div className="rounded-sm w-6 h-6 flex items-center justify-center" style={{background: "linear-gradient(231deg, #ed8a95 -68.73%, #c40016 91.14%)"}}>
                        <PhoneCheckIcon className="size-5"/>
                    </div>
                    <p className="text-xs text-[#4A4A4A]">Mới, đầy đủ phụ kiện từ nhà sản xuất.</p>
                </div>
            </div>
            <div className="bg-[#f7f7f8] rounded-xl h-[calc(100% - 8px)] p-4">
                <div className="flex items-start gap-2 flex-col">
                    <div className="rounded-sm w-6 h-6 flex items-center justify-center" style={{background: "linear-gradient(231deg, #ed8a95 -68.73%, #c40016 91.14%)"}}>
                        <ShieldCheckIcon className="size-5"/>
                    </div>
                    <p className="text-xs text-[#4A4A4A]">Bảo hành 24 tháng chính hãng, 1 đổi 1 nếu có lỗi từ nhà sản xuất.</p>
                </div>
            </div>
            <div className="bg-[#f7f7f8] rounded-xl h-[calc(100% - 8px)] p-4">
                <div className="flex items-start gap-2 flex-col">
                    <div className="rounded-sm w-6 h-6 flex items-center justify-center" style={{background: "linear-gradient(231deg, #ed8a95 -68.73%, #c40016 91.14%)"}}>
                        <ChipIcon className="size-5"/>
                    </div>
                    <p className="text-xs text-[#4A4A4A]">1 thân máy, 1 dây sạc và 1 hộp nhựa.</p>
                </div>
            </div>
            <div className="bg-[#f7f7f8] rounded-xl h-[calc(100% - 8px)] p-4">
                <div className="flex items-start gap-2 flex-col">
                    <div className="rounded-sm w-6 h-6 flex items-center justify-center" style={{background: "linear-gradient(231deg, #ed8a95 -68.73%, #c40016 91.14%)"}}>
                        <TagIcon className="size-5"/>
                    </div>
                    <p className="text-xs text-[#4A4A4A]">Giá sản phẩm đã bao gồm thuế VAT, có hỗ trợ hoàn thuế VAT - Tax Refund cho khách du lịch.</p>
                </div>
            </div>
        </div>
    )
}
export default CommitProduct;