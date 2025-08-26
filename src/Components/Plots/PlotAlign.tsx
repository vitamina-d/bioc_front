import type { ColorScale, Datum } from "plotly.js";
import Plot from "react-plotly.js";
import { nucleotideColors } from "../../const/nucleotideColors";

interface PlotAlignProps {
    filas: Datum[];
    matriz: Datum[][];
}

function PlotAlign({ filas, matriz }: PlotAlignProps) {

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

    return (
        <Plot
            data={[
                {
                    //x: pattern.length,
                    y: filas,
                    z: matriz,
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
                    text: "text",
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
    );
}

export default PlotAlign;
