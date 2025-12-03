import type { DataStats, Nucleotides } from "../types/DataPlumber";
import PlotHistogram from "./Plots/PlotHistogram";
import PlotSunburst from "./Plots/PlotSunburst";
import { Col, Row } from "react-bootstrap";

type Props = {
    dataStats: DataStats;
};

function PercentPlots({ dataStats }: Props) {
    const nucleotides: Nucleotides = dataStats.nucleotides;
    const lenght: number = dataStats.sequence.length;
    const island: number[] = dataStats.cpg_islands.start;
console.log(dataStats)
    return (
        <Row>
            <Col lg={9}>
                <PlotHistogram
                    title="CpG islands"
                    values={island}
                    lenght={lenght}
                    window={200}
                />
            </Col>
            <Col lg={3}>
                <PlotSunburst nucleotides={nucleotides} />
            </Col>
        </Row>
    );
}

export default PercentPlots;
