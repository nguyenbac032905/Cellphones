import Chart from "react-apexcharts";
const NewProductsChart = () => {
    const options: ApexCharts.ApexOptions = {
        colors:  ["#1A56DB", "#FDBA8C"],
        chart: {
            fontFamily: "Inter, sans-serif",
            foreColor: "#4B5563",
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                columnWidth: "50%",
                borderRadius: 3,
            }
        },
        tooltip: {
            intersect: false,
            shared: true,
            style: {
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
            }
        },
        states: {
            hover: {
                filter: {
                    type: "darken",
                }
            }
        },
        stroke: {
            show: true,
            width: 5,
            colors: ["transparent"]
        },
        grid: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        fill:{
            opacity: 1
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
        yaxis: {
            show: false,
        },
    };
    const series:any = [
        {
            name: "Digital",
            color: "#1A56DB",
            data: [
                { x: "01 Feb", y: 170 },
                { x: "02 Feb", y: 180 },
                { x: "03 Feb", y: 164 },
                { x: "04 Feb", y: 145 },
                { x: "05 Feb", y: 174 },
                { x: "06 Feb", y: 170 },
                { x: "07 Feb", y: 155 },
            ],
        },
        {
            name: "Goods",
            color: "#FDBA8C",
            data: [
                { x: "01 Feb", y: 120 },
                { x: "02 Feb", y: 134 },
                { x: "03 Feb", y: 167 },
                { x: "04 Feb", y: 179 },
                { x: "05 Feb", y: 145 },
                { x: "06 Feb", y: 182 },
                { x: "07 Feb", y: 143 },
            ],
        },
    ];
    return (
        <Chart series={series} options={options} type="bar" height={305} />
    )
}
export default NewProductsChart;