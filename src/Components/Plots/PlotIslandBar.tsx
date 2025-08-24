import Plot from "react-plotly.js";

interface PlotIslandBarProps {
    title: string;
    x: number[];
}

function PlotIslandBar({ title, x }: PlotIslandBarProps) {
    return (
        <Plot
            data={[
                {
                    x: x,
                    y: x.map(() => 1),
                    type: "bar",
                },
            ]}
            layout={{
                title: {
                    text: title,
                },

                yaxis: { visible: false },
                autosize: true,
            }}
            style={{ width: "100%", height: "100%" }}
            useResizeHandler
        />
    );
}

export default PlotIslandBar;
