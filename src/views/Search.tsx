import { useState, type FormEvent } from "react";
import { Card } from "react-bootstrap";
import SelectGenome from "../Components/SelectGenome";
import SequenceViewer from "../Components/SequenceViewer";
import { EnsemblService, SummaryService } from "../services/PublicServices";
import { GetSequenceByRange } from "../services/PlumberServices";
import Detail from "../Components/Detail";
import Header from "../Components/Header";
import type { ResponseGetSequenceByRangePlumber } from "../types/ResponseGetSequenceByRangePlumber";
import type { ResponseGetSequenceByRangePublic } from "../types/ResponseGetSequenceByRangePublic";
import type { ResponseGetSummaryPublic } from "../types/ResponseGetSummaryPublic";

function Search() {
    const [start, setStart] = useState("100000");
    const [end, setEnd] = useState("100100");
    const [chr, setChr] = useState("");
    const [req, setReq] = useState("");
    const [data, setData] = useState("AAA");

    //click button
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        
        if (req === "ensembl") {
            
            console.log("PUBLIC: chr:", chr, "start", start, "end", end);
            const response: ResponseGetSequenceByRangePublic =
                await EnsemblService(chr, parseInt(start), parseInt(end));
            console.log(response);
            setData(response.seq);

        } else if (req === "bsgenome") {
            console.log("PLUMBER: chr:", chr, "start", start, "end", end);
          
            const response: ResponseGetSequenceByRangePlumber =
                await GetSequenceByRange(chr, parseInt(start), parseInt(end));

            console.log(response);
            setData(response.data.sequence);

        } else if (req === "summary") {
            console.log("SUMMARY");
          
            const response: ResponseGetSummaryPublic =
                await SummaryService(1717, "gene");

            console.log(response);
            setData(response.summary);

        }else {
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
