import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function Header({ list }) {
    const totalTasks = list.length;
    const taskNotDone = list.filter(tache => tache.etat !== "Reussi" && tache.etat !== "Abandoné").length;

    const counts = [
        list.filter(t => t.etat === "Nouveau").length,
        list.filter(t => t.etat === "En attente").length,
        list.filter(t => t.etat === "Reussi").length,
        list.filter(t => t.etat === "Abandoné").length,
    ];

    const data = {
        labels: ["Nouveau", "En attente", "Reussi", "Abandoné"],
        datasets: [
            {
                data: totalTasks > 0 ? counts : [1],
                backgroundColor: totalTasks > 0 ? [
                    "#3498db",
                    "#f39c12",
                    "#2ecc71",
                    "#e74c3c"
                ] : ["#bdc3c7"],
                borderWidth: 1,
                borderColor: "#2c3e50"
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'left',
                labels: {
                    color: 'white',
                    font: { size: 12 }
                }
            }
        },
        maintainAspectRatio: false
    };

    return (
        <header style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
            backgroundColor: "#2c3e50",
            color: "white",
            borderRadius: "0 0 10px 10px",
            marginBottom: "20px"
        }}>
            <div>
                <h1 style={{ margin: 0 }}>Todo List</h1>
                <p style={{ margin: "5px 0 0 0" }}>
                    Tâches restantes : <strong>{taskNotDone}</strong> / {totalTasks}
                </p>
            </div>

            <div style={{ width: "300px", height: "120px", display: "flex", justifyContent: "flex-end" }}>
                <Pie data={data} options={options} />
            </div>
        </header>
    );
}

export default Header;