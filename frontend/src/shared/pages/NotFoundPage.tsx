import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <Result
                status="404"
                title="404"
                subTitle="Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xoá."
                extra={
                    <Button
                        type="primary"
                        onClick={() => navigate(-1)}
                    >
                        Quay lại trang trước
                    </Button>
                }
            />
        </div>
    );
};

export default NotFoundPage;