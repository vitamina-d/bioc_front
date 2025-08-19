import { label_bases } from "../const/label_bases";
import { nucleotideColors } from "../const/nucleotideColors";
import { response } from "../const/response";
import type { Nucleotides } from "../interfaces/ApiResponse";
import PlotPie from "./PlotPie";
import PlotBar from "./PlotBar";
import { Button, Card, CardBody, CardText, CardTitle } from "react-bootstrap";
import PlotIslandBar from "./PlotIslandBar";
import PlotHistogram from "./PlotHistogram";
import PlotScatter from "./PlotScatter";
import type { ResponseGetSummaryPublic } from "../types/ResponseGetSummaryPublic";
import { SummaryService } from "../services/PublicServices";
import { useState } from "react";

function Detail() {
    const xValues: number[] = response.data.CpG_ranges.map((r) => r.start);
    const nucleotides: Nucleotides = response.data.nucleotides;
    const [entrez, setEntrez] = useState("1717");
    const [response2, setResponse2] = useState<ResponseGetSummaryPublic>({
        entrezId: "",
        name: "",
        mapLocation: "",
        description: "",
        summary: "",
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

        const res: ResponseGetSummaryPublic = await SummaryService(
            entrez,
            "gene"
        );
        console.log(res);
        setResponse2(res);
    };

    return (
        <div className="container my-4">
            <div className="row mb-4">
                <div className="input-group mb-3 w-auto">
                    <label className="input-group-text">ENTREZID</label>
                    <input
                        type="string"
                        className="form-control"
                        id="inputRange"
                        placeholder={entrez}
                        onChange={(e) => setEntrez(e.target.value)}
                    />
                    <Button onClick={onClick}>Buscar</Button>
                </div>
                <Card className="shadow">
                    <CardBody>
                        <CardTitle>Summary</CardTitle>
                        <CardText>Entrez ID: {response2.entrezId}</CardText>
                        <CardText>Name: {response2.name}</CardText>
                        <CardText>Location: {response2.mapLocation}</CardText>
                        <CardText>Description: {response2.description}</CardText>
                        <CardText>Summary: {response2.summary}</CardText>
                    </CardBody>
                </Card>
            </div>

            <div className="row mb-4">
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
