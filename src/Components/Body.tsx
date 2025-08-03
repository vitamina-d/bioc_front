import { useState, type FormEvent } from "react";
import Card, { CardBody } from "./Card";
import List from "./List";
import SelectGenome from "./SelectGenome";
import SequenceViewer from "./SequenceViewer";
import EnsemblService from "../services/EnsemblService";

function Body() {
    const [start, setStart] = useState("1");
    const [end, setEnd] = useState("2");
    const [chr, setChr] = useState("");
    const [req, setReq] = useState("");
    const [data, setData] = useState("ABC");

    const list: string[] = ["0", "1", "2", "3", "4"];

    const handleSelect = (element: string) => {
        console.log("imprimiendo: ", element);
    };

    //click button
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const url: string = `https://localhost:32773/api/Genome/ensembl?chrom=${chr}&start=${start}&end=${end}`;
        //consulta
        console.log("request a: ", req, "| chr:", chr, "start:", start, "y end:", end);

        const response: string = await EnsemblService(url);
    
        setData(response);
        console.log(data);
    };

    return (
        <div className="mb-3 row">
            <Card>
                <CardBody title="Secuencia" text="" />
                <SelectGenome
                    setChr={setChr}
                    setStart={setStart}
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
