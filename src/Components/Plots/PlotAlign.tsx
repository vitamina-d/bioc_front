import type { ColorScale, Datum } from "plotly.js";
import Plot from "react-plotly.js";
import { nucleotideColors } from "../../const/nucleotideColors";
import type { DataAlign } from "../../types/ResponsePlumber";

interface Props {
    data: DataAlign;
}

function PlotAlign({ data }: Props) {
    const colorScale: ColorScale = [
        [0 / 4, nucleotideColors["A"]],
        [1 / 4, nucleotideColors["T"]],
        [2 / 4, nucleotideColors["C"]],
        [3 / 4, nucleotideColors["G"]],
        [4 / 4, "#000000"],
    ];
    // barra de colores
    const tickVals: Datum[] = [0, 1, 2, 3, 4];
    const tickText: Datum[] = ["A", "T", "C", "G", "-"];

    const filas: Datum[] = ["pattern", "subject"];

    const sequence_pattern: string = data.pattern_align;
    const sequence_subject: string = data.subject_align;
    const pattern_string: string[] = sequence_pattern.split("");
    const subject_string: string[] = sequence_subject.split("");

    ///////////////////////////////////////////////////////////////////////////////
    const pattern_number: number[] = pattern_string.map((nuc) => {
        const idx = tickText.indexOf(nuc);
        return idx;
    });
    const subject_number: number[] = subject_string.map((nuc) => {
        const idx = tickText.indexOf(nuc);
        return idx;
    });
    
    const matriz_number: Datum[][] = [pattern_number, subject_number]; //0A 1T 2C 3G 4-
    const matriz_string: string[][] = [pattern_string, subject_string]; //0A 1T 2C 3G 4-
    console.log(matriz_number)

    return (
        <Plot
            data={[
                {
                    //x: pattern.length,
                    y: filas,
                    z: matriz_number,
                    zmin: 0,
                    zmax: 4,
                    type: "heatmap",
                    colorscale: colorScale,
                    showscale: false,
                    colorbar: {
                        tickvals: tickVals,
                        ticktext: tickText,
                        title: { text: "Bases" },
                    },
                    hoverinfo: "text",
                    hovertext: "text",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    text: matriz_string as any,
                    texttemplate: "%{text}",
                },
            ]}
            layout={{
                title: {
                    text: "Plot Align",
                },
                xaxis: {
                    title: {
                        text: "Position",
                    },
                    rangeslider: { visible: true },
                    //autorange: true,
                },
                yaxis: {
                    title: {
                        text: "Sequences",
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
    );
}

export default PlotAlign;
