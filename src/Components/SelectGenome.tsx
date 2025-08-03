import { type FormEventHandler } from "react";
import Dropdown from "./Dropdown";
import InputRange from "./InputRange";
import Button from "./Button";

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
        <form onSubmit={submit} className="p-3">
            <div className="row g-3">
                <div className="col-12 col-md">
                    <Dropdown setItem={setReq} options={optionsReq}>Consulta a</Dropdown>
                </div>
                <div className="col-12 col-md">
                    <Dropdown setItem={setChr} options={optionsChr}>Cromosoma</Dropdown>
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

const optionsReq = [
    { label: "BSGenome", value: "bsgenome" },
    { label: "Ensembl", value: "ensembl" },
    { label: "NCBI", value: "ncbi" },
];

const optionsChr = [
    { label: "chr1", value: "1" },
    { label: "chr2", value: "2" },
    { label: "chr3", value: "3" },
    { label: "chr4", value: "4" },
    { label: "chr5", value: "5" },
    { label: "chr6", value: "6" },
    { label: "chr7", value: "7" },
    { label: "chr8", value: "8" },
    { label: "chr9", value: "9" },
    { label: "chr10", value: "10" },
    { label: "chr11", value: "11" },
    { label: "chr12", value: "12" },
    { label: "chr13", value: "13" },
    { label: "chr14", value: "14" },
    { label: "chr15", value: "15" },
    { label: "chr16", value: "16" },
    { label: "chr17", value: "17" },
    { label: "chr18", value: "18" },
    { label: "chr19", value: "19" },
    { label: "chr20", value: "20" },
    { label: "chr21", value: "21" },
    { label: "chr22", value: "22" },
    { label: "chrX", value: "X" },
    { label: "chrY", value: "Y" },
];
