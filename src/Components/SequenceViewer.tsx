import TextArea from "./TextArea";
import ButtonOverlay from "./ButtonOverlay";
import { Stack, type ButtonProps } from "react-bootstrap";
import FileUp from "./FileUp";
import type { FastaDictionary } from "../types/FastaDictionary";
import { useState, type ReactNode, type SetStateAction } from "react";

type Props = {
    title: string;
    sequence: string;
    setSequence: React.Dispatch<React.SetStateAction<string>>;
    readonly: boolean;
    children?: ReactNode;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
} & ButtonProps;

function SequenceViewer({
    title,
    sequence,
    setSequence,
    readonly,
    children,
    name,
    setName,
    ...prop
}: Props) {
    const [dictionary, setDictionary] = useState<FastaDictionary>({});
    const [showFileTable, setShowFileTable] = useState<boolean>(false);

    const copySequence = () => {
        navigator.clipboard.writeText(sequence);
    };
    //console.log(dictionary);

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
                className="pb-2 d-flex justify-content-end"
            >
                <div className="d-flex justify-content-end">
                    {!readonly && (
                        <FileUp
                            showTable={showFileTable}
                            setShowTable={setShowFileTable}
                            dictionary={dictionary}
                            setDictionary={setDictionary}
                            setSequence={setSequence}
                            name={name}
                            setName={setName}
                        />
                    )}

                    <ButtonOverlay
                        textHover={"Copy"}
                        sequence={sequence}
                        onClick={copySequence}
                        typeIcon={"copy"}
                        size="sm"
                        variant="outline-secondary"
                        className="mx-1"
                    />
                    <ButtonOverlay
                        textHover={"Clear"}
                        typeIcon="backspace"
                        size="sm"
                        variant="outline-secondary"
                        className="mx-1"
                        {...prop} // onclick
                    />
                </div>
            </Stack>
            {children}
        </Stack>
    );
}

export default SequenceViewer;
