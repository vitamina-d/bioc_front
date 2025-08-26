import { type FormEventHandler } from "react";
import Dropdown from "./Dropdown";
import InputRange from "./InputRange";
import { optionsChromosomes } from "../const/optionsChromosomes";
import { optionsRequestRange } from "../const/optionsRequestRange";
import { Button } from "react-bootstrap";

type Props = {
    submit: FormEventHandler;
    setChr: React.Dispatch<React.SetStateAction<string>>;
    start: string;
    setStart: React.Dispatch<React.SetStateAction<string>>;
    end: string;
    setEnd: React.Dispatch<React.SetStateAction<string>>;
    setReq: React.Dispatch<React.SetStateAction<string>>;
};

function SelectGenome({ submit, setChr, setReq, start, setStart, end, setEnd }: Props) {

    return (
        <form onSubmit={submit}>
            <div className="row mx-1 ">
                <div className="col-12 col-md">
                    <Dropdown setItem={setReq} options={optionsRequestRange}>Consulta a</Dropdown>
                </div>
                <div className="col-12 col-md">
                    <Dropdown setItem={setChr} options={optionsChromosomes}>Cromosoma</Dropdown>
                </div>
                <div className="col-6 col-md">
                    <InputRange number={start} setNumber={setStart}>Desde</InputRange>
                </div>
                <div className="col-6 col-md">
                    <InputRange number={end} setNumber={setEnd}>Hasta</InputRange>
                </div>
                <div className="col-12 col-md-auto">
                    <Button variant="light" onClick={submit}>
                        Search
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default SelectGenome;
