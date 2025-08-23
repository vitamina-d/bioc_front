import Plot from "react-plotly.js";

interface PlotPieProps {
    title: string;
    values: number[];
    labels: string[];
    colors: string[];
}

function PlotPie({ title, values, labels, colors }: PlotPieProps) {
    return (
        <Plot
            data={[
                {
                    values: values,
                    labels: labels,
                    type: "pie",
                    sort: false,
                    marker: {
                        colors: colors,
                    },
                    textinfo: "percent", // label+percent
                    textposition: "outside",
                    automargin: true,
                    showlegend: true,
                    hole: 0.5,
                    pull: 0.0,
                },
            ]}
            layout={{
                title: {
                    text: title,
                },
                autosize: true,
                //height: 300,
                legend: {
                    orientation: "h",
                    x: 0.5,
                    y: 0,
                    xanchor: "center",
                    
                },
            }}
            useResizeHandler
            style={{ width: "100%", height: "100%" }}
        />
    );
}

export default PlotPie;
