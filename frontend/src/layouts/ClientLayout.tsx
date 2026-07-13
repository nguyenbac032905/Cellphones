import { Outlet } from "react-router-dom";
import ClientHeader from "./components/ClientHeader";
import ClientFooter from "./components/ClientFooter";

const ClientLayout = () => {
    return(
        <div className="flex flex-col min-h-screen">
            <ClientHeader />
            <main className="flex-1 mt-24 w-full max-w-[1200px] mx-auto"><Outlet /></main>
            <ClientFooter />
        </div>
    )
}
export default ClientLayout;