import { useState, type FormEvent } from "react";
import { Card } from "react-bootstrap";
import SelectGenome from "../Components/SelectGenome";
import SequenceViewer from "../Components/SequenceViewer";
import { EnsemblService } from "../services/PublicServices";
import { GetSequenceByRange } from "../services/PlumberServices";
import Detail from "../Components/Detail";
import Header from "../Components/Header";
import type { ResponseGetSequenceByRangePlumber } from "../types/ResponseGetSequenceByRangePlumber";

function Search() {
    const [start, setStart] = useState("100000");
    const [end, setEnd] = useState("100100");
    const [chr, setChr] = useState("");
    const [req, setReq] = useState("");
    const [data, setData] = useState("AAA");

    //click button
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        console.log("chr:", chr, "start", start, "end", end);

        if (req === "ensembl") {
            const response = await EnsemblService(
                chr,
                parseInt(start),
                parseInt(end)
            );
            console.log(response);
        } else if (req === "bsgenome") {
            // responseFromBackend es el objeto que recibís del backend
            const response: ResponseGetSequenceByRangePlumber =
                await GetSequenceByRange(chr, parseInt(start), parseInt(end));

            setData(response.data.sequence);

            console.log(response); 
        } else {
            setData("ABC");
        }
    };

    return (
        <>
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
                <SequenceViewer sequence={data} />
            </Card>

            <Card className="p-3 my-3 ">
                <Header
                    title="Detalle"
                    text=""
                    imageSrc="../../public/gene.png"
                />
                <Detail />
            </Card>
        </>
    );
}

export default Search;
