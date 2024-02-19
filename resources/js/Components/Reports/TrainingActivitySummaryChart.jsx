import { useEffect } from "react";
import { Bar } from "react-chartjs-2";

export default function TrainingActivitySummary({ summary }) {
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
                    (!summary?0:(summary["5"]?.Male || 0)),
                    (!summary?0:(summary["4"]?.Male || 0)),
                    (!summary?0:(summary["3"]?.Male || 0)),
                    (!summary?0:(summary["2"]?.Male || 0)),
                    (!summary?0:(summary["1"]?.Male || 0)),
                ],
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
            {
                label: "Female",
                data: [
                    (!summary?0:summary["5"]?.Female || 0),
                    (!summary?0:summary["4"]?.Female || 0),
                    (!summary?0:summary["3"]?.Female || 0),
                    (!summary?0:summary["2"]?.Female || 0),
                    (!summary?0:summary["1"]?.Female || 0),
                ],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
            {
                label: "Total",
                data: [
                    (!summary?0:((summary["5"]?.Male||0)+(summary["5"]?.Female||0))),
                    (!summary?0:((summary["4"]?.Male||0)+(summary["4"]?.Female||0))),
                    (!summary?0:((summary["3"]?.Male||0)+(summary["3"]?.Female||0))),
                    (!summary?0:((summary["2"]?.Male||0)+(summary["2"]?.Female||0))),
                    (!summary?0:((summary["1"]?.Male||0)+(summary["1"]?.Female||0))),
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
                text: "Training Activity Rating Summary by Sex",
                color: "#374151",
            },
            legend: {
                display: true,
                position: "bottom",
            },
        },
    };

    useEffect(() => {
        if (summary) {
        }
    }, [summary]);

    return <Bar data={data} options={options} />;
}
