import { useState, type ChangeEvent } from "react";
import { Badge, Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Icon } from "./Icon";
import type { FastaDictionary } from "../types/FastaDictionary";

type Props = {
    setDictionary: React.Dispatch<React.SetStateAction<FastaDictionary>>;
    setShowTable: React.Dispatch<React.SetStateAction<boolean>>;
};

function FileUp({ setDictionary, setShowTable }: Props) {
    const [name, setName] = useState<string>("");

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setName(file.name);
            //console.log(file);
            console.log(file.name);

            const dictionary: FastaDictionary = {};

            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                const text = e.target?.result as string;
                //console.log(text);

                let header: string = "";
                text.split("\n").map((line) => {
                    line = line.trim();
                    
                    if (line.startsWith(">")) {
                        header = line;
                        dictionary[header] = ""; //inicio el header
                    } else if (line.length < 1) {
                        //nada
                        return;
                    } else {
                        if (!header) {
                            header = "unnamed";
                            dictionary[header] = "";
                        } 
                        dictionary[header] += line;
                    }
                });
                console.log(dictionary); ///!!!
                setDictionary(dictionary);
                setShowTable(true);
            };
        }
    };

    return (
        <Form>
            <div className="d-flex justify-content-end ms-2">
                <OverlayTrigger overlay={<Tooltip>{"Upload"}</Tooltip>}>
                    <span className="d-inline-block">
                        <Button
                            className="align-items-center"
                            size="sm"
                            variant="outline-secondary"
                            as="label"
                            htmlFor="file-upload"
                        >
                            <div className="d-flex align-items-start">
                                {name ? (
                                    <Badge bg="secondary" className="me-2">
                                        {name}{" "}
                                    </Badge>
                                ) : (
                                    ""
                                )}
                                <Icon type={"upload"} />
                            </div>
                        </Button>
                    </span>
                </OverlayTrigger>
            </div>
            <Form.Control
                id="file-upload"
                type="file"
                accept=".fasta"
                onChange={handleFileChange}
                className="d-none"
            />
        </Form>
    );
}

export default FileUp;
