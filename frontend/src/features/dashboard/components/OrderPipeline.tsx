const OrderPipeline = () => {
    return (
        <div className="grid grid-cols-7 gap-4">
            <div className="rounded-xl bg-white p-4">Pending: 24</div>
            <div className="rounded-xl bg-white p-4">PROCESSING: 10</div>
            <div className="rounded-xl bg-white p-4">SHIPPED: 15</div>
            <div className="rounded-xl bg-white p-4">DELIVERING: 5</div>
            <div className="rounded-xl bg-white p-4">DELIVERED: 100</div>
            <div className="rounded-xl bg-white p-4">CANCELLED: 3</div>
            <div className="rounded-xl bg-white p-4">RETURNED: 2</div>
        </div>
    )
}
export default OrderPipeline;