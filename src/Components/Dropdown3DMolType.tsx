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
        <Dropdown className="w-100 "  as={ButtonGroup}>
            <label className="input-group-text rounded-0 rounded-start small">
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
                        className="py-1 px-2 "
                        onClick={() => setType(elem)}
                    >
                        {elem}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
            <Dropdown.Toggle
                split
                variant="light"
                className="border rounded-0 rounded-end "
            />
        </Dropdown>
    );
}

export default Dropdown3DMolType;
