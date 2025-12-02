import { ButtonGroup, Dropdown } from "react-bootstrap";

type Props = {
    type: "stick" | "cartoon" | "line" | "sphere";
    setType: React.Dispatch<
        React.SetStateAction<"stick" | "cartoon" | "line" | "sphere">
    >;
};

function Dropdown3DMolType({ type, setType }: Props) {
    const options = ["stick", "cartoon", "line", "sphere"] as const;

    return (
        <Dropdown as={ButtonGroup} className="w-100 input-group input-group-sm">
            <label className="input-group-text rounded-0 rounded-start">
                Type
            </label>
            <label className="input-group-text bg-white border rounded-0  flex-grow-1 text-start">
                {type}
            </label>
            <Dropdown.Menu>
                {options.map((elem) => (
                    <Dropdown.Item
                        key={elem}
                        active={elem === type}
                        className="small"
                        onClick={() => setType(elem)}
                    >
                        {elem}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
            <Dropdown.Toggle
                split
                variant="light"
                className="border rounded-0 rounded-end"
                size="sm"
            />
        </Dropdown>
    );
}

export default Dropdown3DMolType;
