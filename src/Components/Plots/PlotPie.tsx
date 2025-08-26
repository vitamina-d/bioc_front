import Plot from "react-plotly.js";

interface PlotPieProps {
    title: string;
    values: number[];
    labels: string[];
    colors: string[];
}

function PlotPie({ title, values, labels, colors }: PlotPieProps) {
    return (
        <div
      className="d-flex justify-content-center"
      style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}
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
                        //textposition: "outside",
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
                    height: 300,
                    showlegend: true,
                    legend: {
                        orientation: "h",
                        x: 0.5,
                        y: -0.3,
                        xanchor: "center",
                        yanchor: "top",
                    },
                }}
                useResizeHandler style={{ width: "100%", height: "100%" }}
            />{" "}
        </div>
    );
}

export default PlotPie;
