import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import type { RevenueChart } from "../types/dashboard.type";
const SaleChart = ({revenueData}: {revenueData: RevenueChart}) => {
    const isDarkTheme = "dark";
    
    const borderColor = isDarkTheme ? "#374151" : "#F3F4F6";
    const labelColor = isDarkTheme ? "#93ACAF" : "#6B7280";
    const opacityFrom = isDarkTheme ? 0 : 0.45;
    const opacityTo = isDarkTheme ? 0.15 : 0;

    const options: ApexOptions = {
        stroke: {
            curve: "smooth"
        },
        chart: {
            type: "area",
            fontFamily: "Inter, sans-serif",
            foreColor: labelColor,
            toolbar: {
                show: false
            }
        },
        fill: {
            type: "gradient",
            gradient: {
                opacityFrom,
                opacityTo,
                type: "vertical"
            }
        },
        tooltip: {
            style: {
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 5,
            strokeColors: "#ffffff",
            hover: {
                size: 8
            }
        },
        grid: {
            show: true,
            borderColor: borderColor,
            strokeDashArray: 1,
            padding: {
                left: 35,
                bottom: 15
            }
        },
        xaxis: {
            categories: revenueData.category,
            labels: {
                style: {
                    colors: [labelColor],
                    fontSize: "14px",
                    fontWeight: 500,
                },
            },
            axisBorder: {
                color: borderColor,
            },
            axisTicks: {
                color: borderColor,
            },
            crosshairs: {
                show: true,
                position: "back",
                stroke: {
                    color: borderColor,
                    width: 1,
                    dashArray: 10,
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: [labelColor],
                    fontSize: "14px",
                    fontWeight: 500,
                },
                formatter: function (value:any) {
                    return value.toLocaleString("vi-VN") + "đ";
                },
            },
        },
        legend: {
            fontSize: "14px",
            fontWeight: 500,
            fontFamily: "Inter, sans-serif",
            labels: {
                colors: [labelColor],
            },
            itemMargin: {
                horizontal: 10,
            },
        },
        responsive: [
            {
                breakpoint: 1024,
                options: {
                    xaxis: {
                        labels: {
                            show: false,
                        },
                    },
                },
            },
        ],
    };
    const series = revenueData.series;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    return mounted ? (
        <Chart type="area" options={options} series={series} height={420}/>
    ) : null;
}
export default SaleChart;