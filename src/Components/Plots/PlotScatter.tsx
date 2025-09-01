import Plot from "react-plotly.js";

type Props = {
    title: string;
    values: number[];
}

function PlotScatter({ title, values }: Props) {
    return (
        <Plot
            data={[
                {
                    x: values,
                    y: values.map(() => 0),
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
                    //title: "X",
                    showline: false,
                    showgrid: true,
                    zeroline: false,
                },
                yaxis: { visible: false },
                height: 300,
                autosize: true,
                
            }}
            style={{ width: "100%", height: "100%" }}
            useResizeHandler
        />
    );
}

export default PlotScatter;
