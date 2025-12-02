import { useState, type ChangeEvent } from "react";
import { Button, Form } from "react-bootstrap";
import { Icon } from "./Icon";
import type { FastaDictionary } from "../types/FastaDictionary";

type Props = {
    setName: React.Dispatch<React.SetStateAction<string>>;
    setDictionary: React.Dispatch<React.SetStateAction<FastaDictionary>>;
    setShowTable: React.Dispatch<React.SetStateAction<boolean>>;
};

function FormUploadDrag({ setName, setDictionary, setShowTable }: Props) {
    const [isDrag, setIsDrag] = useState(false);
    const [text, setText] = useState("Upload FASTA");

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDrag(true);
    };

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDrag(false);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDrag(false);

        if (e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            setText(file.name ? file.name : "untitled");
            handleFile(file);
        }
    };
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            handleFile(file);
        }
    };
    const handleFile = (file: File) => {
        setName(file.name);
        console.log(file);
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
                        header = "untitled";
                        dictionary[header] = "";
                    }
                    dictionary[header] += line;
                }
            });
            //console.log(dictionary); ///!!!
            setDictionary(dictionary);
            setShowTable(true);
        };
    };
    return (
        <>
            <div
                className={`d-flex align-items-center ${isDrag ? "bg-light" : ""}`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <Form className="w-100">
                    <Button
                        className="d-flex p-5"
                        size="sm"
                        variant="outline-secondary"
                        as="label"
                        htmlFor="file-upload"
                    >
                        <div className="">
                            <Icon type={"upload"} /> {text}
                        </div>
                    </Button>
                    <Form.Control
                        id="file-upload"
                        type="file"
                        accept=".fasta"
                        onChange={handleFileChange}
                        className="d-none"
                    />
                </Form>
            </div>
        </>
    );
}

export default FormUploadDrag;
