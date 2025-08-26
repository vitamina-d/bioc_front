import { Card, Form, InputGroup } from "react-bootstrap";
import Header from "../Components/Header";
import { label_bases } from "../const/label_bases";
import { nucleotideColors } from "../const/nucleotideColors";
import Plot from "react-plotly.js";
import type { ColorScale, Datum, PlotType } from "plotly.js";

function AlignView() {
    const type: PlotType = "heatmap";
    const y: Datum[] = ["pattern", "subject"];

    const sequence_pattern = "ACAGT"
    const sequence_subject = "AC-GT";

    const pattern_string: string[] = sequence_pattern.split("");
    const subject_string: string[] = sequence_subject.split("");

    ///////////////////////////////////////////////////////////////////////////////
    const pattern_number: number[] = pattern_string.map((nuc) => {
        const idx = label_bases.indexOf(nuc);
        return idx == -1 ? 4 : idx;
    });
    const subject_number: number[] = subject_string.map((nuc) => {
        const idx = label_bases.indexOf(nuc);
        return idx == -1 ? 4 : idx;
    });
    const matriz: Datum[][] = [pattern_number, subject_number]; //0A 1T 2C 3G 4-
    ///////////////////////////////////////////////////////////////////////////////
    /*
    const pattern_number123: number[] = [];
    const subject_number123: number[] = [];
    for (let i = 0; i < pattern_string.length; i++) {
        const p = pattern_string[i];
        const s = subject_string[i];
        if (p == s) {
            pattern_number123[i] = 1;
            subject_number123[i] = 1;
        } else {
            pattern_number123[i] = 2;
            subject_number123[i] = 2;
        }
    }

    
    const matriz:Datum[][] = [pattern_number123, subject_number123]; //match 1 | mismatch 2 | gap 3
    */
    ///////////////////////////////////////////////////////////////////////////////

    // Ticks de la barra de colores
    const tickVals: Datum[] = [0, 1, 2, 3, 4];
    const tickText: Datum[] = ["A", "T", "C", "G", "-"];

    const colorScale: ColorScale = [
        [0 / 4, nucleotideColors["A"]],
        [1 / 4, nucleotideColors["T"]],
        [2 / 4, nucleotideColors["C"]],
        [3 / 4, nucleotideColors["G"]],
        [4 / 4, "#000000"],
    ];

    const text: string[] = matriz.flatMap((row, i) =>
        row.map((_, j) => `${["pattern", "subject"][i]}: ${pattern_string[j]}`)
    );

    return (
        <Card className="p-3 my-3 ">
            <Header
                title="Alinear"
                text="subtitle."
                imageSrc="../../public/gene.png"
            />
            <InputGroup className="mb-3">
                <InputGroup.Text>Pattern</InputGroup.Text>
                <Form.Control value={sequence_pattern} as="textarea" />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>Subject</InputGroup.Text>
                <Form.Control value={sequence_subject} as="textarea" />
            </InputGroup>
            <Card.Body>
                <Plot
                    data={[
                        {
                            //x: pattern.length,
                            y: y,
                            z: matriz,
                            zmin: 0,
                            zmax: 4,
                            type: type,
                            colorscale: colorScale,
                            showscale: false,
                            colorbar: {
                                tickvals: tickVals,
                                ticktext: tickText,
                                title: { text: "Bases" },
                            },
                            hoverinfo: "text",
                            hovertext: text,
                            text: text,
                        },
                    ]}
                    layout={{
                        title: {
                            text: "Alineamiento de secuencias",
                        },
                        xaxis: {
                            title: {
                                text: "Posicion",
                            },
                            rangeslider: { visible: true },
                            //autorange: true,
                        },
                        yaxis: {
                            title: {
                                text: "Secuencia",
                            },
                        },
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

export default AlignView;
