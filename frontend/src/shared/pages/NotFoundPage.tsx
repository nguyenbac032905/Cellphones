
import { Button } from "antd";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="text-center">
                <h1 className="text-8xl font-bold text-blue-600">
                    404
                </h1>

                <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                    Trang không tồn tại
                </h2>

                <p className="mt-2 text-gray-500">
                    Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xoá.
                </p>

                <Link to="/">
                    <Button
                        type="primary"
                        size="large"
                        className="mt-6"
                    >
                        Quay về trang chủ
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;