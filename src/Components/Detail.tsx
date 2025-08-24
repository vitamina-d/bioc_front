import { label_bases } from "../const/label_bases";
import { nucleotideColors } from "../const/nucleotideColors";
import { response } from "../const/response";
import type { Nucleotides } from "../types/ApiResponse";
import PlotPie from "./Plots/PlotPie";
import PlotBar from "./Plots/PlotBar";
import { Card, CardBody } from "react-bootstrap";
import PlotIslandBar from "./Plots/PlotIslandBar";
import PlotHistogram from "./Plots/PlotHistogram";
import PlotScatter from "./Plots/PlotScatter";
import SequenceViewer from "./SequenceViewer";

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
        <div>
            <Card className="shadow">
                <CardBody>
                    <SequenceViewer
                        sequence={
                            "AAAAAAACCCCCCCCCGGGGGGGGGTTTTTTTTTTTCCCCCCCCCGGGGGGGGGG"
                        }
                    />

                    <div className="row">
                        <div className="col-lg-6">
                            <PlotPie
                                title=""
                                values={nucleotides.counts}
                                labels={nucleotides.labels}
                                colors={colors}
                            />
                        </div>
                        <div className="col-lg-6">
                            <PlotPie
                                title=""
                                values={atcg.counts}
                                labels={atcg.labels}
                                colors={colors}
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Card className="shadow">
                <CardBody>
                    <div className="row">
                        <div className="col-lg-6">
                            <PlotBar
                                title=""
                                x={nucleotides.labels}
                                y={nucleotides.counts}
                                colors={colors}
                            />
                        </div>
                        <div className="col-lg-6">
                            <PlotBar
                                title=""
                                x={atcg.labels}
                                y={atcg.counts}
                                colors={colors}
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Card className="shadow">
                <div className="row mb-4">
                    <div className="col-lg-3">
                        <PlotPie
                            title=""
                            values={nucleotides.counts}
                            labels={nucleotides.labels}
                            colors={colors}
                        />
                    </div>
                    <div className="col-lg-3">
                        <PlotPie
                            title=""
                            values={atcg.counts}
                            labels={atcg.labels}
                            colors={colors}
                        />
                    </div>
                    <div className="col-lg-3">
                        <PlotBar
                            title=""
                            x={nucleotides.labels}
                            y={nucleotides.counts}
                            colors={colors}
                        />
                    </div>
                    <div className="col-lg-3">
                        <PlotBar
                            title=""
                            x={atcg.labels}
                            y={atcg.counts}
                            colors={colors}
                        />
                    </div>
                </div>
            </Card>

            <PlotIslandBar title="CpG" x={xValues} />
            <PlotHistogram title="Histograma" x={xValues} />
            <PlotScatter title="Dispersion CpG" x={xValues} />
        </div>
    );
}

export default Detail;
