import PlotHistogram from "./Plots/PlotHistogram";
import type { DataStats, Nucleotides } from "../types/ResponsePlumber";
import PlotSunburst from "./Plots/PlotSunburst";

type Props = {
    dataStats: DataStats | null;
};

function PercentPlots({ dataStats }: Props) {
    if (!dataStats) {
        return;
    }
    const nucleotides: Nucleotides = dataStats.nucleotides;
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
