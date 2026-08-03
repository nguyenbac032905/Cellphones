import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
const VisitorsChart = () => {
    const isDarkTheme = "dark";

    const fillGradientShade = isDarkTheme ? "dark" : "light";
    const fillGradientShadeIntensity = isDarkTheme ? 0.45 : 1;
    const options: ApexCharts.ApexOptions = {
        labels: [
            "01 Feb",
            "02 Feb",
            "03 Feb",
            "04 Feb",
            "05 Feb",
            "06 Feb",
            "07 Feb",
        ],
        chart: {
            fontFamily: "Inter, sans-serif",
            sparkline: {
                enabled: true,
            },
            toolbar: {
                show: false,
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: fillGradientShade,
                shadeIntensity: fillGradientShadeIntensity,
            },
        },
        plotOptions: {
            area: {
                fillTo: "end",
            },
        },
        theme: {
            monochrome: {
                enabled: true,
                color: "#1A56DB",
            },
        },
        tooltip: {
            style: {
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
            },
        }
    };
    const series: any = [{
        name: "Visitors",
        data: [50, 70, 100, 30, 20, 40, 15]
    }];
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    return mounted ? (
        <Chart height={305} options={options} series={series} type="area" />
    ) : null;
}
export default VisitorsChart;