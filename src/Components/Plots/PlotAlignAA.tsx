import type { Datum } from "plotly.js";
import Plot from "react-plotly.js";
import type { DataAlign } from "../../types/DataPlumber";

const aminoacids = [
    "A",
    "R",
    "N",
    "D",
    "C",
    "Q",
    "E",
    "G",
    "H",
    "I",
    "L",
    "K",
    "M",
    "F",
    "P",
    "S",
    "T",
    "W",
    "Y",
    "V",
    "match",
    "-",
];
const aminoAcidColors: Record<string, string> = {
    A: "#80c0c0",
    R: "#c08080",
    N: "#c0c080",
    D: "#f08080",
    C: "#f0f020",
    Q: "#c0c080",
    E: "#f08080",
    G: "#80c0c0",
    H: "#c080c0",
    I: "#80c080",
    L: "#80c080",
    K: "#c08080",
    M: "#80c080",
    F: "#c080c0",
    P: "#8080c0",
    S: "#c0c0c0",
    T: "#c0c0c0",
    W: "#c080c0",
    Y: "#c080c0",
    V: "#80c080",
    "-": "#000000", // gap
    "*": "#000000", // stop
};

type Props = {
    qseq: string;
    hseq: string;
};

function PlotAlignAA({ qseq, hseq }: Props) {
    const colorScale: string[] = aminoacids.map((aa) =>
        aa === "match" ? "#00ff00" : aminoAcidColors[aa]
    );
    const tickVals: Datum[] = aminoacids.map((_, i) => i);
    const tickText: Datum[] = aminoacids;

    const filas: Datum[] = ["pattern", "subject"];

    const sequence_pattern: string = qseq;
    const sequence_subject: string = hseq;
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

export default PlotAlignAA;
