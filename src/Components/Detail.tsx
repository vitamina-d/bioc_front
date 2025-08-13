import Plot from "react-plotly.js";
import { bootstrap_colors } from "../color/colors";

function Detail() {

    const bases = ["A", "T", "C", "G"];
    const baseCounts = [20, 15, 55, 10]; 

    const cpgIslands = ["Island1", "Island2", "Island3"];
    const cpgCounts = [5, 2, 7];

    return (
        <div className="container my-4">

            {/* Card general */}
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">Resumen</h5>
                    <p className="card-text">
                        Estadísticas básicas de la secuencia: cantidad de bases,
                        islas CpG y distribución A/T/C/G.
                    </p>
                </div>
            </div>

            <div className="row">
                {/* Pie chart de bases */}
                <div className="col-md-6 mb-4">
                    <Plot
                        data={[
                            {
                                values: baseCounts,
                                labels: bases,
                                type: "pie",
                                marker: { colors: [
                                    bootstrap_colors.primary,
                                    bootstrap_colors.warning,
                                    bootstrap_colors.success,
                                    bootstrap_colors.danger,
                                ]},
                                textinfo: "label",
                            },
                        ]}
                        layout={{
                            title: "Distribución de Bases",
                            height: 400,
                            width: 400,
                        }}
                        style={{ width: "100%" }}
                    />
                </div>

                {/* Bar chart de islas CpG */}
                <div className="col-md-6 mb-4">
                    <Plot
                        data={[
                            {
                                x: cpgIslands,
                                y: cpgCounts,
                                type: "bar",
                                marker: { color: "#0dcaf0" }, // info
                            },
                        ]}
                        layout={{
                            title: "Islas CpG por Región",
                            height: 400,
                            width: 400,
                        }}
                        style={{ width: "100%" }}
                    />
                </div>
            </div>

            <div className="border border-secondary m-3">
                
                <Plot
                    data={[
                        {
                            x: [1, 2, 3],
                            y: [2, 6, 3],
                            type: "scatter",
                            mode: "lines+markers",
                            marker: { color: "red" },
                        },
                        { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
                    ]}
                    layout={{
                        width: 400,
                        height: 400,
                        title: "A Fancy Plot",
                    }}
                />
            </div>
        </div>
    );
}

export default Detail;
