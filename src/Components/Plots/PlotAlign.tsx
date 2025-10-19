import type { ColorScale, Datum } from "plotly.js";
import Plot from "react-plotly.js";
import {
    bootstrap_colors,
    nucleotideColors,
} from "../../config/nucleotideColors";
import type { DataAlign } from "../../types/DataPlumber";

type Props = {
    data: DataAlign;
};

function PlotAlign({ data }: Props) {
    const colorScale: ColorScale = [
        [0 / 5, nucleotideColors["A"]],
        [1 / 5, nucleotideColors["T"]],
        [2 / 5, nucleotideColors["C"]],
        [3 / 5, nucleotideColors["G"]],
        [4 / 5, "blue"],
        [5 / 5, bootstrap_colors.dark],
    ];
    // barra de colores
    const tickVals: Datum[] = [0, 1, 2, 3, 4, 5];
    const tickText: Datum[] = ["A", "T", "C", "G", "match", "-"];

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
    console.log(matriz_number);

    const numPat: number[] = [];
    const numSub: number[] = [];
    for (let i = 0; i < pattern_string.length; i++) {
        if (pattern_string[i] == subject_string[i]) {
            numPat.push(tickText.indexOf("match"));
            numSub.push(tickText.indexOf("match"));
        } else {
            numPat.push(tickText.indexOf(pattern_string[i]));
            numSub.push(tickText.indexOf(subject_string[i]));
        }
    }
    const matriz: Datum[][] = [numPat, numSub];
    return (
        <Plot
            data={[
                {
                    //x: pattern.length,
                    y: filas,
                    z: matriz,
                    zmin: 0,
                    zmax: 5,
                    type: "heatmap",
                    colorscale: colorScale,
                    showscale: false,
                    colorbar: {
                        tickvals: tickVals,
                        ticktext: tickText,
                        title: { text: "Bases" },
                    },
                    hoverinfo: "text",
                    //hovertext: "text",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    text: matriz_string as any,
                    texttemplate: "%{text}", //??
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
