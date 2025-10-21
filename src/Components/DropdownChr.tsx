import { ButtonGroup, Dropdown } from "react-bootstrap";
import { optionsChromosomes } from "../config/optionsChromosomes";

type Props = {
    chr: string | null;
    setChr: React.Dispatch<React.SetStateAction<string | null>>;
};

function DropdownChr({ chr, setChr }: Props) {
    return (
        <Dropdown className="w-100" drop={"down"} as={ButtonGroup}>
            <label className="input-group-text rounded-0 rounded-start">
                Cromosome
            </label>
            <label className="input-group-text bg-white border rounded-0  flex-grow-1 text-start">
                {chr ? `chr${chr}` : "Select..."}
            </label>

            <Dropdown.Menu
                className="bg-white text-dark overflow-auto"
                style={{ maxHeight: "200px" }}
            >
                {optionsChromosomes.map((elem) => (
                    <Dropdown.Item
                        className="bg-white rounded-0 text-dark"
                        key={elem.label}
                        active={elem.value === elem.value}
                        onClick={() => setChr(elem.value)}
                    >
                        {elem.label}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
            <Dropdown.Toggle
                split
                variant="light"
                className="border rounded-0 rounded-end"
            />
        </Dropdown>
    );
}

export default DropdownChr;
