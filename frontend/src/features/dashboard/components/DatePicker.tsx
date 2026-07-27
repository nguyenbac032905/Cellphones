import dayjs from "dayjs";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

const Datepicker = () => {
    return (
        <div className="text-sm text-gray-600">
            <RangePicker
                allowClear={false}
                className="!rounded-md !border-gray-200"
                format="MMM DD, YYYY"
                defaultValue={[
                    dayjs().subtract(6, "day"),
                    dayjs(),
                ]}
                presets={[
                    {
                        label: "Yesterday",
                        value: [
                            dayjs().subtract(1, "day"),
                            dayjs().subtract(1, "day"),
                        ],
                    },
                    {
                        label: "Today",
                        value: [dayjs(), dayjs()],
                    },
                    {
                        label: "Last 7 days",
                        value: [
                            dayjs().subtract(6, "day"),
                            dayjs(),
                        ],
                    },
                    {
                        label: "Last 30 days",
                        value: [
                            dayjs().subtract(29, "day"),
                            dayjs(),
                        ],
                    },
                    {
                        label: "Last 90 days",
                        value: [
                            dayjs().subtract(89, "day"),
                            dayjs(),
                        ],
                    },
                ]}
            />
        </div>
    );
};

export default Datepicker;