import Plot from "react-plotly.js";

interface PlotScatterProps {
    title: string;
    x: number[];
}

function PlotScatter({ title, x }: PlotScatterProps) {
    return (
        <Plot
            data={[
                {
                    x: x,
                    y: x.map(() => 0),
                    type: "scatter",
                    mode: "lines+markers",
                    marker: { size: 12, opacity: 0.1 },
                },
            ]}
            layout={{
                title: {
                    text: title,
                },

                xaxis: {
                    title: "X",
                    showline: false,
                    showgrid: true,
                    zeroline: false, 
                },
                yaxis: { visible: false },
                height: 300,
            }}
            style={{ width: "100%" }}
        />
    );
}

export default PlotScatter;
