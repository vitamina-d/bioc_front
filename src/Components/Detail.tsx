import Plot from "react-plotly.js";
import { label_bases } from "../const/label_bases";
import { nucleotideColors } from "../const/nucleotideColors";
import { response } from "../const/response";
import { bootstrap_colors } from "../const/bootstrap_colors";
import type { Nucleotides } from "../types/ApiResponse";
import { align } from "../const/align";

function Detail() {
    const xValues: number[] = response.data.CpG_ranges.map((r) => r.start);
    const nucleotides: Nucleotides = response.data.nucleotides;

    const atcg: Nucleotides = {
        labels: ["AT", "CG"],
        counts: [
            nucleotides.counts[nucleotides.labels.indexOf("A")] +
                nucleotides.counts[nucleotides.labels.indexOf("T")],
            nucleotides.counts[nucleotides.labels.indexOf("C")] +
                nucleotides.counts[nucleotides.labels.indexOf("G")],
        ],
    };

    /////////////////////

    const seqArray1: string[] = align.pattern_align.split("");
    const seqArray2: string[] = align.subject_align.split("");

    // Mapeamos las letras a índices según label_bases
    const z = [seqArray1, seqArray2].map((seq) =>
        seq.map((base) => {
        const idx = label_bases.indexOf(base);
        return idx === -1 ? 4 : idx;    
        } 
    ));

    // Ticks de la barra de colores
    const tickVals = [0, 1, 2, 3, 4];
    const tickText = ["A", "T", "C", "G", "-"];
    
    const colorScale = [
        [0 / label_bases.length, nucleotideColors["A"]],
        [1 / label_bases.length, nucleotideColors["T"]],
        [2 / label_bases.length, nucleotideColors["C"]],
        [3 / label_bases.length, nucleotideColors["G"]],
        [4 / label_bases.length, "#000000"],
    ];
    /////////////////////

    return (
        <div className="container my-4">
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">Resumen</h5>
                    <p className="card-text">Detalles de la secuencia</p>
                </div>
            </div>

            <Plot
                data={[
                    {
                        z: z,
                        x: seqArray1.length,
                        y: ["Seq1", "Seq2"], // filas
                        type: "heatmap",
                        colorscale: colorScale,
                        colorbar: {
                            tickvals: tickVals,
                            ticktext: tickText,
                            title: "Bases",
                        },
                        hoverinfo: "text",
                        text: [seqArray1, seqArray2],
                    },
                ]}
                layout={{
                    title: {
                                text: "Alineamiento de secuencias",
                            },
                    xaxis: {
                        title: "Posición",
                        rangeslider: { visible: true }, 
                        autorange: true,
                    },
                    yaxis: { title: "Secuencia" },
                    height: 400,
                }}
                style={{ width: "100%" }}
            />
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
