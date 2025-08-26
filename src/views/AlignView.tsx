import { Card } from "react-bootstrap";
import Header from "../Components/Header";
import { label_bases } from "../const/label_bases";
import type { Datum } from "plotly.js";
import PlotAlign from "../Components/Plots/PlotAlign";
import Alineador from "../Components/Alineador";
import { useState } from "react";
import type { ResponsePlumberAlign } from "../types/ResponsePlumberAlign";

function AlignView() {
    const [align, setAlign] = useState<ResponsePlumberAlign>();
    const filas: Datum[] = ["pattern", "subject"];
    let matriz: Datum[][] | undefined;

    if(align) {
        const sequence_pattern = align.data.pattern_align;
        const sequence_subject = align.data.subject_align;
        const pattern_string: string[] = sequence_pattern.split("");
        const subject_string: string[] = sequence_subject.split("");

        ///////////////////////////////////////////////////////////////////////////////
        const pattern_number: number[] = pattern_string.map((nuc) => {
            const idx = label_bases.indexOf(nuc);
            return idx == -1 ? 4 : idx;
        });
        const subject_number: number[] = subject_string.map((nuc) => {
            const idx = label_bases.indexOf(nuc);
            return idx == -1 ? 4 : idx;
        });
        matriz = [pattern_number, subject_number]; //0A 1T 2C 3G 4-
    }


    return (
        <Card className="p-3 my-3 ">
            <Header
                title="Alinear"
                text="subtitle."
                imageSrc="../../public/gene.png"
            />
            <Alineador setAlign={setAlign} />

            {matriz ? <PlotAlign filas={filas} matriz={matriz} />: ""}

            
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
