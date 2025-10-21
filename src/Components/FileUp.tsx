import { useState } from "react";
import { Badge, Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Icon } from "./Icon";
import type { FastaDictionary } from "../types/FastaDictionary";
import ModalBodyUpload from "./ModalBodyUpload";
import ModalBasic from "./ModalBasic";
import FastaReadTable from "./FastaReadTable";

type Props = {
    dictionary: FastaDictionary;
    setDictionary: React.Dispatch<React.SetStateAction<FastaDictionary>>;
    showTable: boolean;
    setShowTable: React.Dispatch<React.SetStateAction<boolean>>;
    setSequence: React.Dispatch<React.SetStateAction<string>>;
};

function FileUp({
    dictionary,
    setDictionary,
    showTable,
    setShowTable,
    setSequence,
}: Props) {
    const [name, setName] = useState<string>("");
    const [modalShow, setModalShow] = useState<boolean>(false);

    const openModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setModalShow(true);
    };

    return (
        <>
            <Form>
                <div className="d-flex justify-content-end mx-1">
                    <OverlayTrigger overlay={<Tooltip>{"Upload"}</Tooltip>}>
                        <span className="d-inline-block">
                            <Button
                                className="align-items-center"
                                size="sm"
                                variant="outline-secondary"
                                onClick={openModal}
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
            </Form>
            <ModalBasic
                modalShow={modalShow}
                setModalShow={setModalShow}
                size={"lg"}
                title={"Upload File"}
            >
                <>
                    <ModalBodyUpload
                        setName={setName}
                        setDictionary={setDictionary}
                        setShowTable={setShowTable}
                    />
                    <hr className="my-3" />
                    {dictionary ? (
                        <FastaReadTable
                            setSequence={setSequence}
                            showTable={showTable}
                            dictionary={dictionary}
                        />
                    ) : (
                        <></>
                    )}
                </>
            </ModalBasic>
        </>
    );
}

export default FileUp;
