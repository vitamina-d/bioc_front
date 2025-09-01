import { useEffect, useState, type FormEvent } from "react";
import { Card } from "react-bootstrap";
import SelectGenome from "../Components/SelectGenome";
import SequenceViewer from "../Components/SequenceViewer";
import { EnsemblService } from "../services/PublicServices";
import { GetSequenceByRange } from "../services/PlumberServices";
import Header from "../Components/Header";
import type { ResponsePublicRange } from "../types/ResponsePublicRange";
import type { DataSequence, ResponsePlumber } from "../types/ResponsePlumber";

function RangeView() {
    const [start, setStart] = useState("100000");
    const [end, setEnd] = useState("100100");
    const [chr, setChr] = useState("");
    const [req, setReq] = useState("");
    const [sequence, setSequence] = useState("");

    useEffect(() => {
        /*setDataSequence({
            entrez: "",
            complete: true,
            sequence_length: sequence.length,
            sequence: sequence,
        });*/
    }, [sequence]);

    //click button
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (req === "ensembl") {
            console.log("PUBLIC: chr:", chr, "start", start, "end", end);
            const response: ResponsePublicRange = await EnsemblService(
                chr,
                parseInt(start),
                parseInt(end)
            );
            console.log(response);
            setSequence(response.seq);
        } else if (req === "bsgenome") {
            console.log("PLUMBER: chr:", chr, "start", start, "end", end);

            const response: ResponsePlumber<DataSequence> =
                await GetSequenceByRange(chr, parseInt(start), parseInt(end));

            console.log(response);
            setSequence(response.data.sequence);
        } else {
            setSequence("E R R O R");
        }
    };

    return (
        <Card className="p-3 my-3 ">
            <Header
                title="Buscar Gen"
                text="Ingrese la fuente, cromosoma y rango para consultar la secuencia."
                imageSrc="../../public/gene.png"
            />

            <SelectGenome
                setChr={setChr}
                start={start}
                setStart={setStart}
                end={end}
                setEnd={setEnd}
                setReq={setReq}
                submit={handleSubmit}
            />
            <div className=" mx-3 pb-3 pt-3 ">
                <SequenceViewer
                    sequence={sequence}
                    title={"Sequence"}
                    setSequence={setSequence}
                    readonly={true}
                    clear={true}
                />
            </div>
        </Card>
    );
}

export default RangeView;
