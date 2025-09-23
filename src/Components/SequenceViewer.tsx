import TextArea from "./TextArea";
import ButtonOverlay from "./ButtonOverlay";
import { Stack, type ButtonProps } from "react-bootstrap";
import FileUp from "./FileUp";
import type { FastaDictionary } from "../types/FastaDictionary";
import { useState } from "react";
import FastaReadTable from "./FastaReadTable";

type Props = {
    title: string;
    sequence: string;
    setSequence: React.Dispatch<React.SetStateAction<string>>;
    readonly: boolean;
} & ButtonProps;

function SequenceViewer({
    title,
    sequence,
    setSequence,
    readonly,
    ...prop
}: Props) {
    const [dictionary, setDictionary] = useState<FastaDictionary>({});
    const [showFileTable, setShowFileTable] = useState<boolean>(false);

    const copySequence = () => {
        navigator.clipboard.writeText(sequence);
    };
    console.log(dictionary);



    return (
        <Stack className="d-flex flex-column">
            <TextArea
                title={title}
                sequence={sequence}
                readOnly={readonly}
                rows={4}
                setSequence={setSequence}
            />
            
            <Stack
                direction="horizontal"
                gap={2}
                className="d-flex justify-content-between pb-2"
            >
                <div className="d-flex justify-content-end">
                    {readonly  ? <></> : <FileUp setShowTable={setShowFileTable} setDictionary={setDictionary} />}
                    
                    <ButtonOverlay
                        textHover={"Copy"}
                        sequence={sequence}
                        onClick={copySequence}
                        typeIcon={"copy"}
                        size="sm"
                        variant="outline-secondary"
                    />
                    <ButtonOverlay
                        textHover={"Clear"}
                        typeIcon="backspace"
                        size="sm"
                        variant="outline-secondary"
                        {...prop}
                    />
                </div>
            </Stack>
            {dictionary  ? <FastaReadTable showTable={showFileTable} dictionary={dictionary}  /> : <></> }
        </Stack>
    );
}

export default SequenceViewer;
