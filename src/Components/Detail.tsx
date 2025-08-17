import Plot from "react-plotly.js";
import { label_bases } from "../const/label_bases";
import { nucleotideColors } from "../const/nucleotideColors";
import { response } from "../const/response";
import { bootstrap_colors } from "../const/bootstrap_colors";
import type { Nucleotides } from "../interfaces/ApiResponse";

function Detail() {
    const xValues: number[] = response.data.CpG_ranges.map((r) => r.start);
    const nucleotides: Nucleotides = response.data.nucleotides;

    // o viene en el response

    const atcg: Nucleotides = {
        labels: ["AT", "CG"],
        counts: [
            nucleotides.counts[nucleotides.labels.indexOf("A")] +
                nucleotides.counts[nucleotides.labels.indexOf("T")],
            nucleotides.counts[nucleotides.labels.indexOf("C")] +
                nucleotides.counts[nucleotides.labels.indexOf("G")],
        ],
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
                                values: nucleotides.counts,
                                labels: nucleotides.labels,
                                type: "pie",
                                sort: false,
                                marker: {
                                    colors: label_bases.map(
                                        (b) => nucleotideColors[b]
                                    ),
                                },
                                textinfo: "percent", // label+percent
                                textposition: "outside",
                                automargin: true,
                                showlegend: false,
                                hole: 0.5,
                                pull: 0.0,
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
                                x: nucleotides.labels,
                                y: nucleotides.counts,
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

            <div className="row">
                <div className="col-md-6 mb-4">
                    <Plot
                        data={[
                            {
                                values: atcg.counts,
                                labels: atcg.labels,
                                type: "pie",
                                sort: false,
                                marker: {
                                    colors: label_bases.map(
                                        (b) => nucleotideColors[b]
                                    ),
                                },
                                textinfo: "label+percent", // etiquetas + porcentaje
                                textposition: "outside", // afuera
                                automargin: true,
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
                                x: atcg.labels,
                                y: atcg.counts,
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
                        type: "bar",
                        legendgrouptitle: { font: { variant: "small-caps" } },
                        //mode: "lines+markers",
                        //marker: { color: "red", size: 10, opacity: 0.5  },
                    },
                    //{ type: "bar", x: xValues, y: xValues.map(() => 1) },
                ]}
                layout={{
                    title: {
                        text: "Islas CpG",
                    },
                    font: { variant: "small-caps" },
                    yaxis: { visible: false },
                    //width: "800" ,
                    //height: 400,
                }}
                style={{ width: "100%" }}
            />

            <Plot
                data={[
                    {
                        x: xValues,
                        type: "histogram",
                        histnorm: "probability density",
                        marker: { opacity: 0.5, color: bootstrap_colors.info },
                        //hoverinfo: "all"
                    },
                ]}
                layout={{
                    title: {
                        text: "Histograma",
                    },
                    bargap: 0.05,
                    yaxis: { visible: false },
                    //width: "800" ,
                    height: 400,
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
                        marker: { color: "blue", size: 10, opacity: 0.3 },
                    },
                ]}
                layout={{
                    title: {
                        text: "Posiciones CpG",
                    },
                    xaxis: { title: "Start" },
                    yaxis: { visible: false },
                    //width: "800" ,
                    height: 400,
                }}
                style={{ width: "100%" }}
            />
        </div>
    );
}

export default Detail;
