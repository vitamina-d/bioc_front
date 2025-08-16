import Plot from "react-plotly.js";
import { label_bases } from "../const/label_bases";
import { nucleotideColors } from "../const/nucleotideColors";
import { response } from "../const/response";

function Detail() {
    const xValues = response.data.CpG_ranges.map((r) => r.start);

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
                                values: response.data.nucleotides.counts,
                                labels: response.data.nucleotides.labels,
                                type: "pie",
                                sort: false,
                                marker: {
                                    colors: label_bases.map(
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
                                x: response.data.nucleotides.labels,
                                y: response.data.nucleotides.counts,
                                type: "bar",
                                marker: {
                                    color: label_bases.map(
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
                            //width: 400,
                        }}
                        style={{ width: "100%" }}
                    />
                </div>
            </div>

            <Plot
                data={[
                    {
                        x: xValues,
                        y: xValues.map(() => 1),
                        type: "scatter",
                        mode: "lines+markers",
                        marker: { color: "red" },
                    },
                    { type: "bar", x: xValues, y: xValues.map(() => 1) },
                ]}
                layout={{
                    //width: "800" ,
                    height: 400,
                    title: {
                        text: "A Fancy Plot",
                    },
                    yaxis: { visible: false },
                }}
                style={{ width: "100%" }}
            />

            <Plot
                data={[
                    {
                        x: xValues,
                        type: "histogram",
                        histnorm: "probability density",
                        opacity: 0.6,
                        marker: { color: "skyblue" },
                    },
                ]}
                layout={{
                    title: "Distribución (Densidad)",
                    bargap: 0.05,
                    yaxis: { visible: false },
                }}
                style={{ width: "100%" }}
            />

            <Plot
                data={[
                    {
                        x: xValues,
                        y: xValues.map(() => 1),
                        mode: "markers",
                        type: "scatter",
                        marker: { color: "blue", size: 6 },
                    },
                ]}
                layout={{
                    title: "Posiciones CpG",
                    xaxis: { title: "Start" },
                    yaxis: { visible: false },
                }}
                style={{ width: "100%" }}
            />
        </div>
    );
}

export default Detail;
