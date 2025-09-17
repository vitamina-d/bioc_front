import PlotPie from "./Plots/PlotPie";
import { nucleotideColors } from "../const/nucleotideColors";
import PlotIslandBar from "./Plots/PlotIslandBar";
import PlotHistogram from "./Plots/PlotHistogram";
import PlotScatter from "./Plots/PlotScatter";
import { Carousel } from "react-bootstrap";
import type { DataPercent, Nucleotides } from "../types/ResponsePlumber";

type Props = {
    data: DataPercent;
};

function PercentDashboard({ data }: Props) {
    const nucleotides: Nucleotides = data.composition.nucleotides;
    const values: number[] = Object.values(nucleotides);
    const labels: string[] = Object.keys(nucleotides);

    const par_labels: string[] = ["AC", "GT"];
    const par_values: number[] = [
        nucleotides.A + nucleotides.C,
        nucleotides.G + nucleotides.T,
    ];

    const xValues: number[] = data.cpg_islands.start;

    return (
        data && (
            <Carousel variant="dark" slide={false}>
                <Carousel.Item>
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-lg-6">
                            <PlotPie
                                title="Bases"
                                values={values}
                                labels={labels}
                                colors={Object.values(nucleotideColors)}
                            />
                        </div>
                        <div className="col-lg-6">
                            <PlotPie
                                title="AC GT"
                                values={par_values}
                                labels={par_labels}
                                colors={Object.values(nucleotideColors)}
                            />
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <PlotIslandBar title="CpG" x={xValues} />{" "}
                </Carousel.Item>
                <Carousel.Item>
                    <PlotHistogram
                        title="Histograma"
                        values={xValues}
                        lenght={values.length}
                        window={200}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <PlotScatter title="Dispersion CpG" values={xValues} />
                </Carousel.Item>
            </Carousel>
        )
    );
}

export default PercentDashboard;
