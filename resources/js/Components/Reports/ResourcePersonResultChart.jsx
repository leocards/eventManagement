import { useEffect } from "react";
import { Bar } from "react-chartjs-2";

export default function ResourcePersonResultChart({ evaluation_ratings, name = "" }) {
    const data = {
        labels: [
            "Excellent",
            "Very Satisfactory",
            "Satisfactory",
            "Fair",
            "Poor",
        ],
        datasets: [
            {
                label: "Male",
                data: [
                    (!evaluation_ratings?0:evaluation_ratings["5"].male),
                    (!evaluation_ratings?0:evaluation_ratings["4"].male),
                    (!evaluation_ratings?0:evaluation_ratings["3"].male),
                    (!evaluation_ratings?0:evaluation_ratings["2"].male),
                    (!evaluation_ratings?0:evaluation_ratings["1"].male),
                ],
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
            {
                label: "Female",
                data: [
                    (!evaluation_ratings?0:evaluation_ratings["5"].female),
                    (!evaluation_ratings?0:evaluation_ratings["4"].female),
                    (!evaluation_ratings?0:evaluation_ratings["3"].female),
                    (!evaluation_ratings?0:evaluation_ratings["2"].female),
                    (!evaluation_ratings?0:evaluation_ratings["1"].female),
                ],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
            {
                label: "Total",
                data: [
                    (!evaluation_ratings?0:(evaluation_ratings["5"].male+evaluation_ratings["5"].female)),
                    (!evaluation_ratings?0:(evaluation_ratings["4"].male+evaluation_ratings["4"].female)),
                    (!evaluation_ratings?0:(evaluation_ratings["3"].male+evaluation_ratings["3"].female)),
                    (!evaluation_ratings?0:(evaluation_ratings["2"].male+evaluation_ratings["2"].female)),
                    (!evaluation_ratings?0:(evaluation_ratings["1"].male+evaluation_ratings["1"].female)),
                ],
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 1,
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
                text: "Resource Person"+(name&&(": "+name)),
                color: "#374151",
            },
            legend: {
                display: true,
                position: "bottom",
            },
        },
    };

    return <Bar data={data} options={options} />;
}
