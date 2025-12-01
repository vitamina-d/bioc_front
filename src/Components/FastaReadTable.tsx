import { Button, Form, Table } from "react-bootstrap";
import type { FastaDictionary } from "../types/FastaDictionary";
import { useState } from "react";

type Props = {
    dictionary: FastaDictionary;
    showTable: boolean;
    setSequence: React.Dispatch<React.SetStateAction<string>>;
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
};

function FastaReadTable({
    dictionary,
    showTable,
    setSequence,
    setModalShow,
}: Props) {
    const headers = Object.keys(dictionary);
    const [selected, setSelected] = useState<string[]>([]);

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
        setModalShow(false);
    };

    return (
        showTable && (
            <>
                <div className="d-flex justify-content-end mb-2">
                    <Button
                        onClick={showSelectedSequences}
                        size="sm"
                        variant="outline-dark"
                    >
                        Show selected
                    </Button>
                </div>
                <div
                    style={{
                        overflowY: "auto",
                        overflowX: "auto",
                        maxHeight: "45vh",
                    }}
                >
                    <Table bordered hover className="font-monospace small">
                        <thead
                            style={{
                                position: "sticky",
                                top: 0,
                                zIndex: 2,
                                background: "white",
                            }}
                        >
                            <tr className="text-center">
                                <th>Header</th>
                                <th>Lenght</th>
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
            </>
        )
    );
}
export default FastaReadTable;
