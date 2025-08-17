import { Card } from "react-bootstrap";
import Header from "../Components/Header";
import { label_bases } from "../const/label_bases";
import { nucleotideColors } from "../const/nucleotideColors";
import Plot from "react-plotly.js";
import { align } from "../const/align";

function Align() {
    const sequence_pattern = align.pattern_align;
    const sequence_subject = align.subject_align;

    const pattern: string[] = sequence_pattern.split("");
    const subject: string[] = sequence_subject.split("");

    const pattern_number: number[] = pattern.map((nuc) => {
        const idx = label_bases.indexOf(nuc);
        return idx == -1 ? 4 : idx;
    });
    const subject_number: number[] = subject.map((nuc) => {
        const idx = label_bases.indexOf(nuc);
        return idx == -1 ? 4 : idx;
    });

    const matriz = [pattern_number, subject_number];

    // Ticks de la barra de colores
    const tickVals = [0, 1, 2, 3, 4];
    const tickText = ["A", "T", "C", "G", "-"];

    const colorScale = [
        [0 / 4, nucleotideColors["A"]],
        [1 / 4, nucleotideColors["T"]],
        [2 / 4, nucleotideColors["C"]],
        [3 / 4, nucleotideColors["G"]],
        [4 / 4, "#000000"],
    ];

    return (
        <Card className="p-3 my-3 ">
            <Header
                title="Alinear"
                text="subtitle."
                imageSrc="../../public/gene.png"
            />
            <Card.Body>
                <Plot
                    data={[
                        {
                            x: pattern.length,
                            y: ["pattern", "subject"],
                            z: matriz,
                            zmin: 0,
                            zmax: 4,
                            type: "heatmap",
                            colorscale: colorScale,
                            showscale: false,
                            colorbar: {
                                tickvals: tickVals,
                                ticktext: tickText,
                                title: "Bases",
                            },
                            hoverinfo: "text",
                            text: [pattern, subject],
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
                        dragmode: "pan", ///!!!!!!! arrastrar en el eje x
                    }}
                    config={{
                        scrollZoom: true, ///////!!!!!!!!!!!!!!
                        displayModeBar: true, ////// barra de herramientas
                        responsive: true,
                    }}
                    style={{ width: "100%" }}
                />
            </Card.Body>
        </Card>
    );
}

export default Align;
