import { Link } from "react-router-dom";

const TicketPromo = () => {
    const maskStyle = {
        maskImage: `
            radial-gradient(circle at 1px 2px, transparent 4px, black 5px),
            radial-gradient(circle at 1px 16px, transparent 4px, black 5px),
            radial-gradient(circle at 1px 31px, transparent 4px, black 5px),
            radial-gradient(circle at 1px 45px, transparent 4px, black 5px),
            radial-gradient(circle at 1px 60px, transparent 4px, black 5px),
            radial-gradient(circle at 1px 74px, transparent 4px, black 5px)
        `,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in"
    };

    return (
        <div className="flex w-[220px] h-[75px]">
            <div
                className="flex justify-center items-center bg-primary-500 text-white w-[54px] shrink-0 pl-1"
                style={maskStyle}
            >
                <span className="text-xs text-center">
                    Giảm<br />3%
                </span>
            </div>
            <div className="flex-1 flex justify-between p-1.5 pl-2 bg-[#fff3f4] border-t border-r border-b border-primary-500 rounded-tr-lg rounded-br-lg">
                <div className="flex flex-col justify-between text-left flex-1 min-w-0">
                    <div className="flex flex-col">
                        <span className="font-extrabold text-[11px] text-gray-900 leading-tight">Tối đa 500k</span>
                        <p className="text-[9px] text-gray-700 mt-0.5">
                            Áp dụng sản phẩm hiển thị voucher
                        </p>
                    </div>
                    <div className="text-[8px] text-gray-500 leading-none flex flex-col gap-0.5">
                        <span>Thời hạn thu thập:</span>
                        <span className="font-semibold text-gray-800">23:59 31/07/2026</span>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 shrink-0 w-[58px]">
                    <button className="bg-primary-500 text-white text-[9px] font-bold py-1 px-1.5 rounded-md shadow-sm w-full text-center hover:bg-primary-600 active:scale-95 transition-all">
                        Thu thập
                    </button>
                    <Link to={'/'} className="!text-primary-600 text-[9px] font-semibold !underline">
                        Xem thể lệ
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TicketPromo;