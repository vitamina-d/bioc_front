import { useState, type FormEvent } from "react";
import { Card } from "react-bootstrap";
import SelectGenome from "../Components/SelectGenome";
import SequenceViewer from "../Components/SequenceViewer";
import { GetSequenceByRange } from "../services/BioconductorServices";
import Header from "../Components/Header";
import type {
    DataSequence,
    ResponseBioconductor,
} from "../types/ResponseBioconductor";

function RangeView() {
    const [start, setStart] = useState("100000");
    const [end, setEnd] = useState("100100");
    const [chr, setChr] = useState<string | null>(null);
    const [sequence, setSequence] = useState("");

    //click button
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        console.log("PLUMBER: chr:", chr, "start", start, "end", end);
        if (!chr) {
            alert("chr");
            return;
        }
        const response: ResponseBioconductor<DataSequence> =
            await GetSequenceByRange(chr, parseInt(start), parseInt(end));

        console.log(response);
        setSequence(response.data.sequence);
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
                submit={handleSubmit}
                chr={chr}
            />
            <div className=" mx-3 pb-3 pt-3 ">
                <SequenceViewer
                    sequence={sequence}
                    title={"Sequence"}
                    setSequence={setSequence}
                    readonly={true}
                    onClick={() => setSequence("")}
                />
            </div>
        </Card>
    );
}

export default RangeView;
