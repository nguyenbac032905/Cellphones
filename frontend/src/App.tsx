import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './index.route';
const router = createBrowserRouter(routes);
function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
