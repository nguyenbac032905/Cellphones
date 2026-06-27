import { Spin } from "antd";

type PageLoaderProps = {
    title?: string;
    description?: string;
};

const LoadingScreen = ({
    title = "Loading...",
    description = "Please wait a moment"
}: PageLoaderProps) => {
    return (
        <div className="flex min-h-[400px] items-center justify-center">
            <div className="flex flex-col items-center gap-5">

                <Spin size="large" />

                <div className="space-y-1 text-center">

                    <h3 className="text-lg font-semibold text-gray-700">
                        {title}
                    </h3>

                    <p className="text-sm text-gray-400">
                        {description}
                    </p>

                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;