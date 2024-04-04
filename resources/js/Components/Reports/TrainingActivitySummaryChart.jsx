import { useEffect } from "react";
import { Bar } from "react-chartjs-2";

export default function TrainingActivitySummary({ summary, animation = true }) {
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
                backgroundColor: "rgba(255, 99, 132, 0.5)",
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
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgba(54, 162, 235, 1)",
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
                backgroundColor: "rgba(255, 205, 86, 0.5)",
                borderColor: "rgba(255, 205, 86, 1)",
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
        scales: {
            y: {
                suggestedMin: 1, 
                suggestedMax: 100,
                title: {
                    display: true,
                    text: 'No. of evaluators in percentage'
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, ticks) {
                        return value + '%';
                    }
                }
            },
        },
        animation: animation
    };

    useEffect(() => {
        if (summary) {
        }
    }, [summary]);

    return <Bar data={data} options={options} />;
}
