import Plot from "react-plotly.js";

type Props = {
    title: string;
    x: string[];
    y: number[];
    colors: string[];
};

function PlotBar({ title, x, y, colors }: Props) {
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
                xaxis: {
                    title: { text: "" },
                    tickangle: -45,
                    automargin: true,
                },
                yaxis: { title: { text: "" }, automargin: true },
                autosize: true,
                height: 400,
            }}
            useResizeHandler
            style={{ width: "100%", height: "100%" }}
        />
    );
}

export default PlotBar;
