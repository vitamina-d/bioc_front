import Header from "../Components/Header";
import PlotAlign from "../Components/Plots/PlotAlign";
import { useState } from "react";
import AlignSequences from "../Components/AlignSequences";
import ButtonBadge from "../Components/ButtonBadge";
import type { DataAlign } from "../types/DataPlumber";

function AlignView() {
    const [dataAlign, setDataAlign] = useState<DataAlign>();

    return (
        <div className="row mx-1 ">
            <Header
                title="Alinear"
                text="subtitle."
                imageSrc="../../public/gene.png"
            />
            <AlignSequences setDataAlign={setDataAlign} />
            {dataAlign ? (
                <>
                    <PlotAlign data={dataAlign} />
                    <div className="d-flex justify-content-end">
                        <ButtonBadge
                            text="Score"
                            value={dataAlign.score.toString()}
                        />
                    </div>
                </>
            ) : (
                ""
            )}
        </div>
    );
}

export default AlignView;
