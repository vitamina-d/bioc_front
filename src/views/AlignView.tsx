import { Card } from "react-bootstrap";
import Header from "../Components/Header";
import PlotAlign from "../Components/Plots/PlotAlign";
import { useState } from "react";
import type { ResponsePlumberAlign } from "../types/ResponsePlumberAlign";
import InfoAlign from "../Components/InfoAlign";
import AlignSequences from "../Components/AlignSequences";

function AlignView() {
    const [align, setAlign] = useState<ResponsePlumberAlign>();

    return (
        <Card className="p-3 my-3 ">
            <Header
                title="Alinear"
                text="subtitle."
                imageSrc="../../public/gene.png"
            />
            <AlignSequences setAlign={setAlign} />
            {align ? (
                <>
                    <PlotAlign data={align.data} />
                    <InfoAlign data={align.data} />
                </>
            ) : (
                ""
            )}
        </Card>
    );
}

export default AlignView;

///////////////////////////////////////////////////////////////////////////////
/*
    const pattern_number123: number[] = [];
    const subject_number123: number[] = [];
    for (let i = 0; i < pattern_string.length; i++) {
        const p = pattern_string[i];
        const s = subject_string[i];
        if (p == s) {
            pattern_number123[i] = 1;
            subject_number123[i] = 1;
        } else {
            pattern_number123[i] = 2;
            subject_number123[i] = 2;
        }
    }

    
    const matriz:Datum[][] = [pattern_number123, subject_number123]; //match 1 | mismatch 2 | gap 3
    */
///////////////////////////////////////////////////////////////////////////////
