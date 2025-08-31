import PlotPie from "./Plots/PlotPie";
import { nucleotideColors } from "../const/nucleotideColors";
import PlotHistogram from "./Plots/PlotHistogram";
import type { DataPercent, Nucleotides } from "../types/ResponsePlumber";

type Props = {
    dataPercent: DataPercent;
};

function PercentPlots({ dataPercent }: Props) {
    const nucleotides: Nucleotides = dataPercent.composition.nucleotides;
    const values: number[] = Object.values(nucleotides);
    const labels: string[] = Object.keys(nucleotides);

    const other: number = nucleotides.other;
    console.log(other);

    const par_labels: string[] = ["AC", "GT"];
    const par_values: number[] = [
        nucleotides.A + nucleotides.C,
        nucleotides.G + nucleotides.T,
    ];
    const lenght: number = dataPercent.composition.length;
    const island: number[] = dataPercent.cpg_islands.start;

    return (
        <>
            <div className="row">
                <div className="col-lg-8">
                    <PlotHistogram
                        title=""
                        values={island}
                        lenght={lenght}
                        window={200}
                    />
                </div>
                <div className="col-lg-2">
                    <PlotPie
                        values={values}
                        labels={labels}
                        colors={Object.values(nucleotideColors)}
                    />
                </div>
                <div className="col-lg-2">
                    <PlotPie
                        values={par_values}
                        labels={par_labels}
                        colors={Object.values(nucleotideColors)}
                    />
                </div>{" "}
            </div>
        </>
    );
}

export default PercentPlots;
