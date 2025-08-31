import Plot from "react-plotly.js";

interface PlotHistogramProps {
    title: string;
    values: number[];
    lenght: number;
    window: number;
}
//
function PlotHistogram({ title, values, lenght, window }: PlotHistogramProps) {
    return (
        <Plot
            data={[
                {
                    x: values,
                    type: "histogram",
                    histnorm: "percent",
                    marker: { opacity: 0.5 },
                    xbins: {
                        start: 0,
                        end: lenght,
                        size: window,
                    },
                },
                {
                    x: values,
                    y: values.map(() => -0.5),
                    type: "scatter",
                    mode: "lines+markers",
                    marker: { size: 15, opacity: 0.1 },
                },
            ]}
            layout={{
                title: {
                    text: title,
                },
                bargap: 0.05,
                yaxis: { visible: false },
                //height: 400,
                autosize: true,
                xaxis: {
                    //title: "X",
                    showline: false,
                    showgrid: true,
                    zeroline: false,
                },
                legend: {
                    orientation: "h",
                    x: 0.5,
                    y: -0.3,
                    xanchor: "center",
                    yanchor: "top",
                },
                margin: {
                    l: 0,
                    r: 0,
                    b: 0,
                    t: 0,
                },
            }}
            style={{ width: "100%", height: "100%" }}
            useResizeHandler
        />
    );
}

export default PlotHistogram;
