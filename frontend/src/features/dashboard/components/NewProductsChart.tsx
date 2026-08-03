import { useEffect, useState } from "react";
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
                { x: "01 Feb", y: 10 },
                { x: "02 Feb", y: 10 },
                { x: "03 Feb", y: 10 },
                { x: "04 Feb", y: 10 },
                { x: "05 Feb", y: 5 },
                { x: "06 Feb", y: 5 },
                { x: "07 Feb", y: 5 },
            ],
        },
        {
            name: "Goods",
            color: "#FDBA8C",
            data: [
                { x: "01 Feb", y: 5 },
                { x: "02 Feb", y: 6 },
                { x: "03 Feb", y: 4 },
                { x: "04 Feb", y: 11 },
                { x: "05 Feb", y: 12 },
                { x: "06 Feb", y: 8 },
                { x: "07 Feb", y: 6 },
            ],
        },
    ];
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    return mounted ? (
        <Chart series={series} options={options} type="bar" height={305} />
    ) : null;
}
export default NewProductsChart;