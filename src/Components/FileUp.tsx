import { useState, type ChangeEvent } from "react";
import { Badge, Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Icon } from "./Icon";

type Props = {
    setSequence: React.Dispatch<React.SetStateAction<string>>;
};
type FastaDict = Record<string, string>; // header,seq

function FileUp({ setSequence }: Props) {
    const [name, setName] = useState<string>("");

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setName(file.name);
            console.log(file);
            console.log(file.name);

            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                const dictionary: FastaDict = {};
                const text = e.target?.result as string;
                console.log(text);
                const headers: string[] = [];
                const sequences: string[] = [];

                //let seq: string = "";
                let header:string = "";
                text.split("\n").map((line) => {
                    line = line.trim();
                    if (line.startsWith(">")) {
                        header = line;
                        dictionary[header] = "";
                        // guardo la seq
                       /* if (seq) {
                            sequences.push(seq);
                            seq = "";
                        }
                        headers.push(line);*/

                    } else if (line && header) {
                        dictionary[header] += line;
                        //seq = seq.concat(line);
                    }
                });
                /*si quedo sin guardar
                if (seq) {
                    sequences.push(seq);
                    seq = "";
                }
                console.log(headers);
                console.log(sequences);
                console.log(seq);*/
                console.log(dictionary);
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
