import { label_bases } from "../const/label_bases";
import { nucleotideColors } from "../const/nucleotideColors";
import { response } from "../const/response";
import type { Nucleotides } from "../interfaces/ApiResponse";
import PlotPie from "./PlotPie";
import PlotBar from "./PlotBar";
import { Card, CardBody, CardText, CardTitle } from "react-bootstrap";
import PlotIslandBar from "./PlotIslandBar";
import PlotHistogram from "./PlotHistogram";
import PlotScatter from "./PlotScatter";

function Detail() {
    const xValues: number[] = response.data.CpG_ranges.map((r) => r.start);
    const nucleotides: Nucleotides = response.data.nucleotides;

    const atcg: Nucleotides = {
        labels: ["AT", "CG"],
        counts: [
            nucleotides.counts[nucleotides.labels.indexOf("A")] +
                nucleotides.counts[nucleotides.labels.indexOf("T")],
            nucleotides.counts[nucleotides.labels.indexOf("C")] +
                nucleotides.counts[nucleotides.labels.indexOf("G")],
        ],
    };

    const colors: string[] = label_bases.map((b) => nucleotideColors[b]);

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-lg-6">
                    <Card className="shadow">
                        <CardBody>
                            <CardTitle>Resumen</CardTitle>
                            <CardText>Detalles de la secuencia</CardText>
                            <div className="row">
                                <div className="col-lg-6">
                                    <PlotPie
                                        title={"Plotly pie"}
                                        values={nucleotides.counts}
                                        labels={nucleotides.labels}
                                        colors={colors}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <PlotBar
                                        title={"Plotly bar"}
                                        x={nucleotides.labels}
                                        y={nucleotides.counts}
                                        colors={colors}
                                    />
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-lg-6">
                    <Card className="shadow">
                        <CardBody>
                            <CardTitle>Resumen</CardTitle>
                            <CardText>Detalles de la secuencia</CardText>
                            <div className="row">
                                <div className="col-lg-6">
                                    <PlotPie
                                        title={"Plotly pie"}
                                        values={atcg.counts}
                                        labels={atcg.labels}
                                        colors={colors}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <PlotBar
                                        title={"Plotly bar"}
                                        x={atcg.labels}
                                        y={atcg.counts}
                                        colors={colors}
                                    />
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>

            <PlotIslandBar title="CpG" x={xValues} />
            <PlotHistogram title="Histograma" x={xValues} />
            <PlotScatter title="Dispersion CpG" x={xValues} />
        </div>
    );
}

export default Detail;
