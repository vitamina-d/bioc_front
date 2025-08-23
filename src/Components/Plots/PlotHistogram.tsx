import Plot from "react-plotly.js";

interface PlotHistogramProps {
    title: string;
    x: number[];
}

function PlotHistogram({ title, x }: PlotHistogramProps) {
    return (
        <Plot
            data={[
                {
                    x: x,
                    type: "histogram",
                    histnorm: "probability density",
                    marker: { opacity: 0.5 },
                },
            ]}
            layout={{
                title: {
                    text: title,
                },
                bargap: 0.05,
                yaxis: { visible: false },
                height: 400,
            }}
            style={{ width: "100%" }}
        />
    );
}

export default PlotHistogram;
