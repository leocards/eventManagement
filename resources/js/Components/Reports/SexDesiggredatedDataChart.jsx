import { useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";

export default function SexDesiggredatedDataChart({ gender = {Male: 0, Female: 0}, animation = true }) {
    const Female = gender.hasOwnProperty("Female") ? gender.Female : 0
    const Male = gender.hasOwnProperty("Male") ? gender.Male : 0

    const data = {
        labels: ["Female", "Male", "total"],
        datasets: [
            {
                label: "Sex",
                data: [Female, Male, (Male + Female)],
                backgroundColor: [
                    "rgb(54, 162, 235)",
                    "rgb(255, 99, 132)",
                    "rgb(255, 205, 86)",
                ],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                align: "center",
                text: "Sex Disaggregated Data",
                color: "#374151",
            },
            legend: {
                display: true,
                position: "bottom",
            }
        },
        animation: animation
    };

    return <Doughnut data={data} options={options} />;
}
