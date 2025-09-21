import PlotPie from "./Plots/PlotPie";
import { nucleotideColors } from "../const/nucleotideColors";
import PlotHistogram from "./Plots/PlotHistogram";
import { Accordion } from "react-bootstrap";
import type { DataPercent, Nucleotides } from "../types/DataPlumber";

type Props = {
    data: DataPercent;
};

function PercentAccordion({ data }: Props) {
    const nucleotides: Nucleotides = data.composition.nucleotides;
    const values: number[] = Object.values(nucleotides);
    const labels: string[] = Object.keys(nucleotides);

    const other: number = nucleotides.other;
    console.log(other);

    const par_labels: string[] = ["AC", "GT"];
    const par_values: number[] = [
        nucleotides.A + nucleotides.C,
        nucleotides.G + nucleotides.T,
    ];
    const lenght: number = data.composition.length;
    const island: number[] = data.cpg_islands.start;

    return (
        data && (
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Nucleotides</Accordion.Header>
                    <Accordion.Body>
                        <div className="row">
                            <div className="col-lg-6">
                                <PlotPie
                                    title=""
                                    values={values}
                                    labels={labels}
                                    colors={Object.values(nucleotideColors)}
                                />
                            </div>
                            <div className="col-lg-6">
                                <PlotPie
                                    title=""
                                    values={par_values}
                                    labels={par_labels}
                                    colors={Object.values(nucleotideColors)}
                                />
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        CpG islands histogram/bar
                    </Accordion.Header>
                    <Accordion.Body>
                        {" "}
                        <PlotHistogram
                            title=""
                            values={island}
                            lenght={lenght}
                            window={200}
                        />
                    </Accordion.Body>
                </Accordion.Item>

                {/*<Accordion.Item eventKey="2">
                    <Accordion.Header>CpG islands Scatter</Accordion.Header>
                    <Accordion.Body>
                        {" "}
                        <PlotScatter title="" x={island} />
                    </Accordion.Body>
                </Accordion.Item>*/}
            </Accordion>
        )
    );
}

export default PercentAccordion;
