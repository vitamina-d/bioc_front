import Plot from "react-plotly.js";

type Props = {
    pattern: string;
    subject: string;
}

function DotPlot({ pattern, subject }: Props) {
    const pattern_string: string[] = pattern.split("");
    const subject_string: string[] = subject.split("");

    const match_x: number[] = [];
    const match_y: number[] = [];
    const misMatch_x: number[] = [];
    const misMatch_y: number[] = [];
    const cercanos_x: number[] = [];
    const cercanos_y: number[] = [];
    const text: string[] = [];

    for (let i = 0; i < pattern_string.length; i++) {
        for (let j = 0; j < subject_string.length; j++) {
            if (i == j) {
                if (pattern_string[i] === subject_string[j]) {
                    match_x.push(i);
                    match_y.push(j);
                    text.push(pattern_string[i]);
                } else {
                    misMatch_x.push(i);
                    misMatch_y.push(j);
                }
            } else {
                if (pattern_string[i] === subject_string[j]) {
                    cercanos_x.push(i);
                    cercanos_y.push(j);
                }
            }
        }
    }
    const tickVals = (seq: string) => {
        const tickVals = [];
        for (let i = 0; i < seq.length; i++) {
            tickVals.push(i);
        }
        return tickVals;
    };

    return (
        <Plot
            data={[
                {
                    type: "scatter",
                    x: match_x,
                    y: match_y,
                    mode: "markers",
                    name: "m",
                    marker: {
                        //color: "rgba(204, 204, 204, 0.95)",
                        color: "green",
                        line: {
                            //color: "rgba(217, 217, 217, 1.0)",
                            //width: 1,
                        },
                        symbol: "circle",
                        size: 7,
                    },
                },
                {
                    type: "scatter",
                    x: misMatch_x,
                    y: misMatch_y,
                    mode: "markers",
                    name: "mm",
                    marker: {
                        //color: "rgba(204, 204, 204, 0.95)",
                        color: "red",
                        line: {
                            //color: "rgba(217, 217, 217, 1.0)",
                            //width: 1,
                        },
                        symbol: "square",
                        size: 5,
                    },
                },
                {
                    type: "scatter",
                    x: cercanos_x,
                    y: cercanos_y,
                    mode: "markers",
                    name: "cerca",
                    opacity: 0.9,
                    marker: {
                        //color: "rgba(204, 204, 204, 0.95)",
                        color: "blue",
                        line: {
                            //color: "rgba(217, 217, 217, 1.0)",
                            //width: 1,
                        },
                        symbol: "circle",
                        size: 5,
                    },
                },
            ]}
            layout={{
                title: {
                    text: "dotplot",
                    font: {
                        //    color: "rgb(204, 204, 204)",
                    },
                },
                margin: {
                    //    l: 140,
                    //    r: 40,
                    //    b: 50,
                    //    t: 80,
                },
                xaxis: {
                    title: {
                        text: "pattern",
                    },
                    tickmode: "array",
                    tickvals: tickVals(pattern),
                    ticktext: pattern_string,
                    //showgrid: false,
                    //showline: true,
                    //linecolor: "rgb(102, 102, 102)",
                    tickfont: {
                        color: "rgb(102, 102, 102)",
                    },
                    ticks: "outside",
                    //tickcolor: "rgb(102, 102, 102)",
                    //rangeslider: { visible: true },
                    //autorange: true,
                },
                yaxis: {
                    title: {
                        text: "subject",
                    },
                    tickmode: "array",
                    tickvals: tickVals(subject),
                    ticktext: subject_string,
                },
                //dragmode: "pan", ///!!!!!!! arrastrar en el eje x
                legend: {
                    font: {
                        //    size: 10,
                    },
                    //yanchor: "middle",
                    //xanchor: "right",

                    orientation: "h",
                    x: 0.5,
                    y: -0.3,
                    xanchor: "center",
                    yanchor: "top",
                },
                //width: 400,
                height: 400,
                //paper_bgcolor: "rgb(254, 247, 234)",
                //plot_bgcolor: "rgb(254, 247, 234)",
                hovermode: "x", //
            }}
            config={{
                scrollZoom: true, ///////!!!!!!!!!!!!!!
                //displayModeBar: true, ////// barra de herramientas
                responsive: true,
            }}
            style={{ width: "100%" }}
        />
    );
}

export default DotPlot;
