type Props = {
    setChr: React.Dispatch<React.SetStateAction<string>>,
};

function Dropdown({ setChr }: Props) {
    return (
        <>
            <div className="input-group mb-3">
                <label
                    className="input-group-text"
                    htmlFor="inputGroupSelect01"
                >
                    Cromosoma
                </label>
                <select className="form-select w-auto" id="inputGroupSelect01" onChange={(e) => setChr(e.target.value)}>
                    <option value="">Seleccione...</option>
                    {options.map((elem, i) => (
                        <option
                            key={i}
                            value={elem}
                        >
                            {elem}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}

export default Dropdown;

const options = [
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
