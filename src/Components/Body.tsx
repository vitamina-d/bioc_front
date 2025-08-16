import { useState, type FormEvent } from "react";
import Card from "./Card";
import SelectGenome from "./SelectGenome";
import SequenceViewer from "./SequenceViewer";
import EnsemblService from "../services/EnsemblService";
import BSGenomeService from "../services/BSGenomeService";
import Detail from "./Detail";
import Header from "./Header";
import ReadFile from "./ReadFile";

function Body() {
    const [start, setStart] = useState("100000");
    const [end, setEnd] = useState("100100");
    const [chr, setChr] = useState("");
    const [req, setReq] = useState("");
    const [data, setData] = useState<string>("ACGT");

    const [content, setContent] = useState<string>("");

    //click button
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        let url: string = "";
        let response: string = "";

        console.log("REQQQQQ", req);
        if (req === "ensembl") {
            url = `https://localhost:32773/api/Genome/ensembl?chrom=${chr}&start=${start}&end=${end}`;
            response = await EnsemblService(url);
        } else if (req === "bsgenome") {
            url = `https://localhost:32773/api/Genome/seq?chrom=chr${chr}&start=${start}&end=${end}`;
            response = await BSGenomeService(url);
        } else {
            response = "ABC";
        }

        //consulta
        console.log(
            "request a: ",
            req,
            "| chr:",
            chr,
            "start:",
            start,
            "y end:",
            end
        );

        setData(response);
        console.log(data);
    };

    return (
        <>
            <Card>
                <Header
                    title="Consulta Genomica"
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

            <Card>
                <Header
                    title="Subir FASTA"
                    text="Ingrese la fuente para consultar la secuencia."
                    imageSrc="../../public/gene.png"
                />
                <ReadFile content={content} setContent={setContent} />
            </Card>

            <Card>
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

export default Body;
