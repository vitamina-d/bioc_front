import { Button, Form, Table } from "react-bootstrap";
import type { FastaDictionary } from "../types/FastaDictionary";
import { useEffect, useState } from "react";

type Props = {
    dictionary: FastaDictionary;
    showTable: boolean;
};

function FastaReadTable({ dictionary, showTable }: Props) {
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
        //
        alert("select all");
    };

    return (
        showTable && (
            <>
                {" "}
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
                <Button size="sm"> Show selected </Button>
                {/* <ul className="list-group font-monospace small">
                     <li  className="py-1 list-group-item small" >Headers</li>
                    {headers.map((head) => (
                        <li
                            style={{ cursor: "pointer" }}
                            onClick={() => selectHeader(head)}
                            key={head}
                            className={`py-0 list-group-item small list-group-item-action ${
                                //hover
                                selected.includes(head) ? "active" : ""
                            }`}
                        >
                            {`${head} (length = ${dictionary[head].length})`}
                        </li>
                    ))}
                </ul>*/}
            </>
        )
    );
}
export default FastaReadTable;
