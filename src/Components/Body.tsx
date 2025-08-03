import { useState, type FormEvent } from "react";
import Card, { CardBody } from "./Card";
import List from "./List";
import SelectGenome from "./SelectGenome";
import SequenceViewer from "./SequenceViewer";
import EnsemblService from "../services/EnsemblService";
import BSGenomeService from "../services/BSGenomeService";

function Body() {
    const [start, setStart] = useState("100000");
    const [end, setEnd] = useState("100100");
    const [chr, setChr] = useState("");
    const [req, setReq] = useState("");
    const [data, setData] = useState<string>("ACGT");
    const list: string[] = ["0", "1", "2", "3", "4"];

    const handleSelect = (element: string) => {
        console.log("imprimiendo: ", element);
    };

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
        <div className="mb-3 row">
            <Card>
                <CardBody title="Secuencia Genomica" text="" />
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

            {list.length ? (
                <Card>
                    <CardBody title="Lista" text="lista" />
                    <List onSelect={handleSelect} data={list} />
                </Card>
            ) : (
                ""
            )}
        </div>
    );
}

export default Body;
