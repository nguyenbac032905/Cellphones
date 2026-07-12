import { Outlet } from "react-router-dom";
import ClientHeader from "./components/ClientHeader";

const ClientLayout = () => {
    return(
        <div className="flex flex-col min-h-screen">
            <ClientHeader />
            <main className="flex-1 mt-30"><Outlet /></main>
            <footer className="p-4 text-center">Client footer</footer>
        </div>
    )
}
export default ClientLayout;