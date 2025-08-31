import PlotHistogram from "./Plots/PlotHistogram";
import type { DataStats, Nucleotides } from "../types/ResponsePlumber";
import PlotSunburst from "./Plots/PlotSunburst";

type Props = {
    dataStats: DataStats;
};

function PercentPlots({ dataStats }: Props) {
    const nucleotides: Nucleotides = dataStats.nucleotides;

    const other: number = nucleotides.other;
    console.log(other);

    const lenght: number = dataStats.length;
    const island: number[] = dataStats.cpg_islands.start;

    return (
        <>
            <div className="row">
                <div className="col-lg-9">
                    <PlotHistogram
                        title=""
                        values={island}
                        lenght={lenght}
                        window={200}
                    />
                </div>
                <div className="col-lg-3">
                    <PlotSunburst nucleotides={nucleotides} />
                </div>
            </div>
        </>
    );
}

export default PercentPlots;
