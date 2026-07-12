import ClientHeaderBottom from "./ClientHeaderBottom";
import ClientHeaderTop from "./ClientHeaderTop";

const ClientHeader = () => {
    return (
        <header id="header" className="max-w-screen bg-linear-to-b from-primary-300 to-primary-500 flex flex-col items-center justify-center text-white fixed left-0 top-0 right-0 z-[1000]">
            {/* HEADER TOP */}
            <ClientHeaderTop />
            {/* HEADER BOTTOM */}
            <ClientHeaderBottom />
        </header>
    );
};

export default ClientHeader;