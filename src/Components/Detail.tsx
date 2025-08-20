import { label_bases } from "../const/label_bases";
import { nucleotideColors } from "../const/nucleotideColors";
import { response } from "../const/response";
import type { Nucleotides } from "../interfaces/ApiResponse";
import PlotPie from "./PlotPie";
import PlotBar from "./PlotBar";
import { Button, Card, CardBody, CardText } from "react-bootstrap";
import PlotIslandBar from "./PlotIslandBar";
import PlotHistogram from "./PlotHistogram";
import PlotScatter from "./PlotScatter";
import type { ResponseGetSummaryPublic } from "../types/ResponseGetSummaryPublic";
import { SummaryService } from "../services/PublicServices";
import { useState } from "react";
import Header from "./Header";

function Detail() {
    const xValues: number[] = response.data.CpG_ranges.map((r) => r.start);
    const nucleotides: Nucleotides = response.data.nucleotides;
    const [entrez, setEntrez] = useState("1717");
    const [symbol, setSymbol] = useState("DHCR7");
    const [summary, setSummary] = useState<ResponseGetSummaryPublic>({
        entrezId: "",
        name: "",
        mapLocation: "",
        description: "",
        summary: "",
        scientificname: "",
        taxId: 0,
    });
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

    //click button
    const onClick = async () => {
        console.log("SUMMARY");
        console.log("ENTREZ: " + entrez + "| SYMBOL: " + symbol);
        const res: ResponseGetSummaryPublic = await SummaryService(
            entrez,
            "gene"
        );
        console.log(res);
        setSummary(res);
    };

    return (
        <div className="container my-4">
            <div className="input-group mb-3 w-auto">
                <label className="input-group-text">SYMBOL</label>
                <input
                    type="string"
                    className="form-control"
                    id="inputSymbol"
                    placeholder={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                />
                <Button onClick={() => alert(symbol)}>Buscar</Button>
            </div>
            <div className="input-group mb-3 w-auto">
                <label className="input-group-text">ENTREZID</label>
                <input
                    type="string"
                    className="form-control"
                    id="inputEntrez"
                    placeholder={entrez}
                    onChange={(e) => setEntrez(e.target.value)}
                />
                <Button onClick={onClick}>Buscar</Button>
            </div>

            <Card className="shadow">
                <Header
                    title={summary.name}
                    text={`${summary.scientificname} (Tax ID: ${summary.taxId})`}
                />
                <CardBody>
                    <CardText>Description: {summary.description}</CardText>
                    <CardText>Location: {summary.mapLocation}</CardText>
                    <CardText>Summary: {summary.summary}</CardText>

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
