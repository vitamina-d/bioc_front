import Plot from "react-plotly.js";

interface PlotPieProps {
    title?: string;
    values: number[];
    labels: string[];
    colors: string[];
}

function PlotPie({ title, values, labels, colors }: PlotPieProps) {
    return (
        <div
        >
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
                        textinfo: "label+percent", // label+percent
                        textposition: "inside",
                        //automargin: true,
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
                    showlegend: false,
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
                    //paper_bgcolor: "rgb(254, 247, 234)",
                }}
                useResizeHandler
                style={{ width: "100%", height: "100%" }}
            />{" "}
        </div>
    );
}

export default PlotPie;
