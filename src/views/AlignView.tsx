import { Card } from "react-bootstrap";
import Header from "../Components/Header";
import PlotAlign from "../Components/Plots/PlotAlign";
import { useState } from "react";
import AlignSequences from "../Components/AlignSequences";
import type { DataAlign } from "../types/ResponseBioconductor";
import ButtonBadge from "../Components/ButtonBadge";

function AlignView() {
    const [dataAlign, setDataAlign] = useState<DataAlign>();

    return (
        <Card className="p-3 my-3 ">
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
        </Card>
    );
}

export default AlignView;
