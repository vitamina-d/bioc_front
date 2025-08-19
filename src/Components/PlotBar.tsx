import Plot from "react-plotly.js";

interface PlotBarProps {
    title: string;
    x: string[];
    y: number[];
    colors: string[];
}

function PlotBar({ title, x, y, colors }: PlotBarProps) {
    return (
        <Plot
            data={[
                {
                    x: x,
                    y: y,
                    type: "bar",
                    marker: {
                        color: colors,
                    },
                },
            ]}
            layout={{
                title: {
                    text: title,
                },
                xaxis: { title: { text: "Bases" }, tickangle: -45, automargin: true },
                yaxis: { title: { text: "Frecuencia" }, automargin: true },
                autosize: true,
                height: 300,
            }}
            useResizeHandler
            style={{ width: "100%", height: "100%" }}
        />
    );
}

export default PlotBar;
