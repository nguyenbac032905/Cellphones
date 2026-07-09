import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function ForbiddenPage() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 24,
            }}
        >
            <Result
                status="403"
                title="403"
                subTitle="Bạn không có quyền truy cập vào trang này."
                extra={
                    <Button type="primary" onClick={() => navigate(-1)}>
                        Quay lại
                    </Button>
                }
            />
        </div>
    );
}