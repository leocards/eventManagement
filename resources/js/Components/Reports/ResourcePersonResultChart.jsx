import { useEffect } from "react";
import { Bar } from "react-chartjs-2";

export default function ResourcePersonResultChart({ evaluation_ratings, name = "", animation = true }) {
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
                backgroundColor: "rgba(255, 99, 132, 0.5)",
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
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgba(54, 162, 235, 1)",
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
                backgroundColor: "rgba(255, 205, 86, 0.5)",
                borderColor: "rgba(255, 205, 86, 1)",
                borderWidth: 1,
            },
        ],
    };

    const getTotals = () => {
        let totalFemale = 0;
        let totalMale = 0;

        for (const key in evaluation_ratings) {
            if (data.hasOwnProperty(key)) {
                totalFemale += data[key].female;
                totalMale += data[key].male;
            }
        }

        let ttl = totalFemale + totalMale

        return ttl < 6 ? ttl + 6 : ttl
    }

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
        scales: {
            y: {
                suggestedMin: 1, 
                suggestedMax: getTotals(),
                title: {
                    display: true,
                    text: 'No. of evaluators'
                },
                ticks: {
                    callback: function(value, index, ticks) {
                        return value;
                    }
                }
            },
        },
        animation: animation
    };

    return <Bar data={data} options={options} />;
}
