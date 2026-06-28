import { Link, useParams } from "react-router-dom";
import { useAdminProduct } from "../hooks/useAdminProduct";
import LoadingScreen from "../../../shared/components/LoadingScreen";
import CustomAlert from "../../../shared/components/CustomAlert";
import {
    Card,
    Tabs,
    Tag,
    Typography,
    Divider,
    Image,
    Descriptions
} from "antd";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import AdminTitle from "../../../shared/components/AdminTitle";

const { Title, Text } = Typography;

const AdminProductsDetailPage = () => {
    const { productID } = useParams();
    const { data, loading, error } = useAdminProduct(productID);

    const [mainImage, setMainImage] = useState<string>("");
    const images = data?.images || [];
    const resolvedMainImage = useMemo(() => {
        if (!images.length) return "";

        return (
            images.find((img: any) => img.isMain)?.url ||
            images[0]?.url ||
            ""
        );
    }, [images]);
    const displayMain = mainImage || resolvedMainImage;


    if (loading) {
        return <LoadingScreen />;
    }

    if (error) {
        return <CustomAlert error={error} />;
    }

    if (!data) {
        return (
            <CustomAlert error="Product not found" />
        );
    }

    return (
        <div className="flex flex-col gap-5">
            <AdminTitle title="Product Detail" description="View detailed information of a product" />
            <Card className="rounded-2xl shadow-sm">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* LEFT */}
                    <div className="lg:col-span-2">
                        {/* HEADER */}
                        <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 pb-5 md:flex-row md:items-start md:justify-between">
                            <div>
                                <Title level={2} className="!mb-1">
                                    {data.title}
                                </Title>
                                <Text type="secondary">
                                    Category:
                                    <Link
                                        to={`/admin/products?category=${data.product_category_id?._id}`}
                                        className="ml-2 inline-flex items-center !underline rounded-md bg-gray-200 px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-300 hover:text-black"
                                    >
                                        {data.product_category_id?.title}
                                    </Link>
                                </Text>
                            </div>
                            <div className="rounded-xl bg-gray-50 px-5 py-3 text-right flex">
                                <Link
                                    to={`/admin/products/edit/${productID}`}
                                    className="text-sm font-medium text-gray-700 hover:text-black"
                                >
                                    Edit Product
                                </Link>
                            </div>
                        </div>
                        {/* PRODUCT INFO */}
                        <Descriptions
                            bordered
                            column={1}
                            size="middle"
                            className="mb-6"
                        >
                            <Descriptions.Item label="Price">
                                <Tag color="gold" className="px-3 py-1 text-sm font-medium">
                                    {data.price.toLocaleString("vi-VN")} đ
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Discount Percentage">
                                <Tag color="volcano" className="px-3 py-1 text-sm font-medium">
                                    -{data.discountPercentage}%
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Status">
                                <Tag
                                    color={data.status === "active" ? "success" : "error"}
                                    className="px-3 py-1 text-sm font-medium capitalize"
                                >
                                    {data.status}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Sold">
                                <Tag color="geekblue" className="px-3 py-1 text-sm font-medium">
                                    {data.sold} sold
                                </Tag>
                            </Descriptions.Item>
                            {data.featured && (
                                <Descriptions.Item label="Featured">
                                    <Tag color="magenta" className="px-3 py-1 text-sm font-medium">
                                        Featured
                                    </Tag>
                                </Descriptions.Item>
                            )}
                            <Descriptions.Item label="Created At">
                                <Tag color="blue" className="px-3 py-1 text-sm">
                                    {new Date(data.createdAt).toLocaleString("vi-VN")}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Updated At">
                                <Tag color="cyan" className="px-3 py-1 text-sm">
                                    {new Date(data.updatedAt).toLocaleString("vi-VN")}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Deleted">
                                <Tag
                                    color={data.deleted ? "error" : "success"}
                                    className="px-3 py-1 text-sm font-medium"
                                >
                                    {data.deleted ? "Deleted" : "Available"}
                                </Tag>
                            </Descriptions.Item>
                        </Descriptions>
                        {/* TABS */}
                        <Tabs
                            defaultActiveKey="description"
                            items={[
                                {
                                    key: "description",
                                    label: "Description",
                                    children: (
                                        <div
                                            className="prose max-w-none"
                                            dangerouslySetInnerHTML={{
                                                __html: data.description
                                            }}
                                        />
                                    )
                                },
                                {
                                    key: "content",
                                    label: "Content",
                                    children: (
                                        <div
                                            className="prose max-w-none"
                                            dangerouslySetInnerHTML={{
                                                __html: data.content
                                            }}
                                        />
                                    )
                                }
                            ]}
                        />
                    </div>
                    {/* RIGHT */}
                    <div>
                        <Card className="rounded-2xl">
                            {/* MAIN IMAGE */}
                            <div className="flex justify-center">
                                {displayMain ? (
                                    <Image
                                        src={displayMain}
                                        alt={data.title}
                                        className="rounded-xl object-cover"
                                        width={400}
                                    />
                                ) : (
                                    <div className="h-[250px] w-[400px] rounded-xl bg-gray-200" />
                                )}
                            </div>

                            <Divider />
                            {/* SWIPER THUMBNAILS */}
                            <div className="relative px-6">
                                <Swiper
                                    modules={[Navigation]}
                                    navigation={{
                                        nextEl: ".custom-next",
                                        prevEl: ".custom-prev",
                                    }}
                                    spaceBetween={8}
                                    slidesPerView={4}
                                >
                                    {images.map((img: any, index: number) => (
                                        <SwiperSlide key={index}>
                                            <div
                                                onClick={() => setMainImage(img.url)}
                                                className="group cursor-pointer overflow-hidden rounded-md border border-transparent transition hover:border-[#1677ff]"
                                            >
                                                <img
                                                    src={img.url}
                                                    className="aspect-square w-full object-cover"
                                                    alt={`Slide ${index}`}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <button className="custom-prev absolute left-0 top-1/2 z-20 flex h-8 w-4 -translate-y-1/2 items-center justify-center rounded-r-md bg-gray-300 text-white shadow-sm transition hover:bg-gray-400">
                                    <LeftOutlined className="text-[12px]" />
                                </button>

                                <button className="custom-next absolute right-0 top-1/2 z-20 flex h-8 w-4 -translate-y-1/2 items-center justify-center rounded-l-md bg-gray-300 text-white shadow-sm transition hover:bg-gray-400">
                                    <RightOutlined className="text-[12px]" />
                                </button>
                            </div>
                        </Card>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default AdminProductsDetailPage;