import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
const SaleChart = () => {
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
            categories: [
                "01 Feb",
                "02 Feb",
                "03 Feb",
                "04 Feb",
                "05 Feb",
                "06 Feb",
                "07 Feb",
            ],
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
                    return "$" + value;
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
    const series = [
        {
            name: "Revenue",
            data: [6356, 6218, 6156, 6526, 6356, 6256, 6056],
            color: "#1A56DB",
        },
        {
            name: "Revenue (previous period",
            data: [6556, 6725, 6424, 6356, 6586, 6756, 6616],
            color: "#FDBA8C",
        }
    ];
    return (
        <Chart type="area" options={options} series={series} height={420} />
    )
}
export default SaleChart;