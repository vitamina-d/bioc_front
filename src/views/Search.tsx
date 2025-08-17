import { useState, type FormEvent } from "react";
import { Card } from "react-bootstrap";
import SelectGenome from "../Components/SelectGenome";
import SequenceViewer from "../Components/SequenceViewer";
import EnsemblService from "../services/EnsemblService";
import BSGenomeService from "../services/BSGenomeService";
import Detail from "../Components/Detail";
import Header from "../Components/Header";

function Search() {
    const [start, setStart] = useState("100000");
    const [end, setEnd] = useState("100100");
    const [chr, setChr] = useState("");
    const [req, setReq] = useState("");
    const [data, setData] = useState<string>("ACGT");

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
