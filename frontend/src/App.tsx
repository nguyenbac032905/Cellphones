import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './index.route';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const router = createBrowserRouter(routes);
function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
