import { CategoryScale } from 'chart.js'; // Import CategoryScale
import Chart from 'chart.js/auto'; // Import Chart to register scales
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale);

export default function ConsolidatedDataChart({ consolidated, animation = true }) {
    const data = {
        labels: [
            "Objective is met",
            "Needs are met",
            "Relevance to the job",
            "Appropriate activities",
            "Opportunity to particiapte",
            "Schedule of Activities",
            "Training",
            "Meals",
            "Accomodation",
            "Function",
            "Logistical support",
            "Overall",
        ],
        datasets: [
            {
                label: "Male",
                data: [
                    consolidated?.q1.Male || 0,
                    consolidated?.q2.Male || 0,
                    consolidated?.q3.Male || 0,
                    consolidated?.q4.Male || 0,
                    consolidated?.q5.Male || 0,
                    consolidated?.q6.Male || 0,
                    consolidated?.q7.Male || 0,
                    consolidated?.q8.Male || 0,
                    consolidated?.q9.Male || 0,
                    consolidated?.q10.Male || 0,
                    consolidated?.q11.Male || 0,
                    consolidated?.q12.Male || 0,
                ],
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
            {
                label: "Female",
                data: [
                    consolidated?.q1.Female || 0,
                    consolidated?.q2.Female || 0,
                    consolidated?.q3.Female || 0,
                    consolidated?.q4.Female || 0,
                    consolidated?.q5.Female || 0,
                    consolidated?.q6.Female || 0,
                    consolidated?.q7.Female || 0,
                    consolidated?.q8.Female || 0,
                    consolidated?.q9.Female || 0,
                    consolidated?.q10.Female || 0,
                    consolidated?.q11.Female || 0,
                    consolidated?.q12.Female || 0,
                ],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
            {
                label: "Total",
                data: [
                    consolidated?.total,
                    consolidated?.total,
                    consolidated?.total,
                    consolidated?.total,
                    consolidated?.total,
                    consolidated?.total,
                    consolidated?.total,
                    consolidated?.total,
                    consolidated?.total,
                    consolidated?.total,
                    consolidated?.total,
                    consolidated?.total,
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
                text: "Consolidated Data",
                color: "#374151",
            },
            legend: {
                display: true,
                position: "bottom",
            },
        },
        animation: animation
    };

    return <Bar data={data} options={options} />;
}
