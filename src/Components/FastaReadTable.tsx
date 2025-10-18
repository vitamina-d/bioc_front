import { Button, Form, Table } from "react-bootstrap";
import type { FastaDictionary } from "../types/FastaDictionary";
import { useEffect, useState } from "react";

type Props = {
    dictionary: FastaDictionary;
    showTable: boolean;
    setSequence: React.Dispatch<React.SetStateAction<string>>;
};

function FastaReadTable({ dictionary, showTable, setSequence }: Props) {
    const headers = Object.keys(dictionary);
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        console.log("selected: ", selected);
    }, [selected]);

    const selectHeader = (header: string) => {
        if (selected.includes(header)) {
            setSelected(selected.filter((remove) => remove !== header)); //
        } else {
            setSelected([...selected, header]);
        }
    };

    const selectAll = () => {
        if (selected.length < headers.length) {
            setSelected(headers);
        } else {
            setSelected([]);
        }
    };
    const checkAll = () => {
        if (selected.length == headers.length) {
            return true;
        } else {
            return false;
        }
    };

    const showSelectedSequences = () => {
        const inOrder = headers.filter((header) => selected.includes(header));
        const sequence = inOrder.map((header) => dictionary[header]).join("");
        setSequence(sequence);
    };

    return (
        showTable && (
            <>
                <div style={{ maxHeight: "300px", maxWidth:"fit-content", overflowY: "auto" }}>
                    <p>en un modal</p>
                    <Table
                        bordered
                        hover
                        size="sm"
                        className="font-monospace small"
                    >
                        <thead className="small">
                            <tr className="text-center">
                                <th>Header</th>
                                <th>Length</th>
                                <th>
                                    <Form.Check
                                        type="checkbox"
                                        checked={checkAll()}
                                        onChange={() => selectAll()}
                                    />
                                </th>
                            </tr>
                        </thead>

                        <tbody className="small">
                            {headers.map((header) => (
                                <tr
                                    key={header}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => selectHeader(header)}
                                >
                                    <td>{header}</td>
                                    <td className="text-center">
                                        {dictionary[header].length}
                                    </td>
                                    <td className="text-center">
                                        <Form.Check
                                            type="checkbox"
                                            checked={selected.includes(header)}
                                            onChange={(e) => {
                                                e.stopPropagation(); // evita que el click dispare dos veces selectHeader
                                                selectHeader(header);
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div className="d-flex justify-content-start">
                    <Button
                        onClick={showSelectedSequences}
                        size="sm"
                        variant="outline-dark"
                        className="mb-2"
                    >
                        Show selected
                    </Button>
                </div>
            </>
        )
    );
}
export default FastaReadTable;
