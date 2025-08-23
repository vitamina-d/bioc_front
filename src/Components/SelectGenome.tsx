import { type FormEventHandler } from "react";
import Dropdown from "./Dropdown";
import InputRange from "./InputRange";
import Button from "./Button";
import { chromosomes } from "../const/chr";
import { optionsRequest } from "../const/optionsDropdownSeq";

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
    const isLoading = false;

    return (
        <form onSubmit={submit}>
            <div className="row">
                <div className="col-12 col-md">
                    <Dropdown setItem={setReq} options={optionsRequest}>Consulta a</Dropdown>
                </div>
                <div className="col-12 col-md">
                    <Dropdown setItem={setChr} options={chromosomes}>Cromosoma</Dropdown>
                </div>
                <div className="col-6 col-md">
                    <InputRange number={start} setNumber={setStart}>Desde</InputRange>
                </div>
                <div className="col-6 col-md">
                    <InputRange number={end} setNumber={setEnd}>Hasta</InputRange>
                </div>
                <div className="col-12 col-md-auto">
                    <Button isLoading={isLoading} onClick={submit}>
                        {isLoading ? "Cargando..." : "Consulta"}
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default SelectGenome;
