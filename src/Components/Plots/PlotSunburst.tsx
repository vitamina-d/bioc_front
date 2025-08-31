import Plot from "react-plotly.js";
import type { Nucleotides } from "../../types/ResponsePlumber";

interface PlotSunburstProps {
    title?: string;
    nucleotides: Nucleotides;
}

function PlotSunburst({ title, nucleotides }: PlotSunburstProps) {

    const total_AC: number = nucleotides.A + nucleotides.C;
    const total_GT: number = nucleotides.G + nucleotides.T;
    const total: number = total_AC + total_GT + nucleotides.other;

    const labels: string[] = ["Total", "AC", "A", "C", "GT", "G", "T", "Other"];
    const parents: string[] = ["", "Total", "AC", "AC", "Total", "GT", "GT", "Total"];
    const values: number[] = [total, total_AC, nucleotides.A, nucleotides.C, total_GT, nucleotides.G, nucleotides.T, nucleotides.other];

    return (
        <div>
            <Plot
                data={[
                    {
                        type: "sunburst",
                        labels: labels,
                        parents: parents,
                        values: values,
                        opacity: 0.9,
                        marker: {
                            line: { width: 2 },
                            colors: [
                                
                            ],
                        },
                        branchvalues: "total",
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

export default PlotSunburst;
