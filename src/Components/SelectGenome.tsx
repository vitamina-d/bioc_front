import type { FormEvent } from "react";
import Dropdown from "./Dropdown";
import Range from "./Range";

const chrom = [
    "chr1",
    "chr2",
    "chr3",
    "chr4",
    "chr5",
    "chr6",
    "chr7",
    "chr8",
    "chr9",
    "chr10",
    "chr11",
    "chr12",
    "chr13",
    "chr14",
    "chr15",
    "chr16",
    "chr17",
    "chr18",
    "chr19",
    "chr20",
    "chr21",
    "chr22",
    "chrX",
    "chrY",
    "chrM", // ADN mitocondrial
];

function SelectGenome() {

    //funcion para una propiedad de evento  
    const handleSubmit = (event: FormEvent) => {
        console.log(event);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="p-3">
                <Dropdown options={chrom} />
                <Range />
                <button type="submit" className="btn btn-primary">
                    Consultar
                </button>
            </form>
        </>
    );
}

export default SelectGenome;
