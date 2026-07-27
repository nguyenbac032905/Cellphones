import Chart from "react-apexcharts";
const UserSignupsChart = () => {
    const isDarkTheme = "dark";

    const backgroundBarColors = isDarkTheme
    ? [
        "#374151",
        "#374151",
        "#374151",
        "#374151",
        "#374151",
        "#374151",
        "#374151",
      ]
    : [
        "#E5E7EB",
        "#E5E7EB",
        "#E5E7EB",
        "#E5E7EB",
        "#E5E7EB",
        "#E5E7EB",
        "#E5E7EB",
      ];
    const options: ApexCharts.ApexOptions = {
        labels:[
            "01 Feb",
            "02 Feb",
            "03 Feb",
            "04 Feb",
            "05 Feb",
            "06 Feb",
            "07 Feb",
        ],
        chart: {
            foreColor: "#4B5563",
            fontFamily: "Inter, sans-serif",
            toolbar: {
                show: false,
            },
        },
        theme: {
            monochrome: {
                enabled: true,
                color: "#1A56DB",
            },
        },
         plotOptions: {
            bar: {
                columnWidth: "25%",
                borderRadius: 3,
                colors: {
                    backgroundBarColors,
                    backgroundBarRadius: 3,
                },
            },
        },
        xaxis: {
            floating: true,
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
            style: {
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
            },
        },
        states: {
            hover: {
                filter: {
                    type: "darken"
                },
            },
        },
        fill: {
            opacity: 1
        },
        yaxis: {
            show: false
        },
        grid: {
            show: false
        },
            dataLabels: {
            enabled: false
        },
        legend: {
            show: false,
        }
    };
    const series = [
        {
            name: "Users",
            data: [34, 45, 53, 38, 55, 32, 36],
        }
    ];
    return (
        <Chart height={305} options={options} series={series} type="bar" />
    )
}
export default UserSignupsChart;