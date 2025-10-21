import Plot from "react-plotly.js";

type Props = {
    title: string;
    x: number[];
};

function PlotIslandBar({ title, x }: Props) {
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
