import { Outlet } from "react-router-dom";

const ClientLayout = () => {
    return(
        <div className="flex flex-col">
            <header className="bg-blue-500 text-white p-4">Client Header</header>
            <main className="flex-1"><Outlet /></main>
            <footer className="bg-gray-200 p-4 text-center">Client footer</footer>
        </div>
    )
}
export default ClientLayout;