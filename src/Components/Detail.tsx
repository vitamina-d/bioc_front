import Plot from "react-plotly.js";
import { bases } from "../const/bases";
import { nucleotideColors } from "../const/nucleotideColors";

function Detail() {
    const baseCounts: Record<string, number> = {
        A: 20,
        T: 15,
        C: 55,
        G: 10,
    };

    return (
        <div className="container my-4">
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">Resumen</h5>
                    <p className="card-text">Detalles de la secuencia</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <Plot
                        data={[
                            {
                                values: bases.map((b) => baseCounts[b]),
                                labels: bases,
                                type: "pie",
                                sort: false,
                                marker: {
                                    colors: bases.map(
                                        (b) => nucleotideColors[b]
                                    ),
                                },
                                textinfo: "label",
                            },
                        ]}
                        layout={{
                            title: {
                                text: "Plotly pie",
                            },
                            height: 400,
                            width: 400,
                        }}
                        style={{ width: "100%" }}
                    />
                </div>

                <div className="col-md-6 mb-4">
                    <Plot
                        data={[
                            {
                                x: bases,
                                y: bases.map((b) => baseCounts[b]),
                                type: "bar",
                                marker: {
                                    color: bases.map(
                                        (b) => nucleotideColors[b]
                                    ),
                                },
                            },
                        ]}
                        layout={{
                            title: {
                                text: "Plotly bar",
                            },
                            xaxis: {
                                title: {
                                    text: "Bases",
                                },
                            },
                            yaxis: {
                                title: {
                                    text: "Frecuencia",
                                },
                            },

                            height: 400,
                            width: 400,
                        }}
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
                        title: {
                            text: "A Fancy Plot",
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default Detail;
