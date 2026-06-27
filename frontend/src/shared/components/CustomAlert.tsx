import { Alert } from "antd";

type Props = {
    title?: string;
    error: string;
    className?: string;
};

const CustomAlert = ({
    title = "Something went wrong",
    error,
    className = ""
}: Props) => {
    return (
        <div
            className={`flex min-h-[60vh] items-center justify-center px-4 ${className}`}
        >
            <Alert
                type="error"
                showIcon
                title={title}
                description={error}
                className="w-full max-w-md rounded-2xl border shadow-sm"
            />
        </div>
    );
};

export default CustomAlert;