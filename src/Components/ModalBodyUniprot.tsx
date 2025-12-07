import { Button, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import Dropdown3DMolType from "./Dropdown3DMolType";
import { Icon } from "./Icon";
import * as $3Dmol from "3dmol";
import { downloadFile } from "../utils/downloadFile";

type Props = {
    estructure: string;
    uniprotId: string;
};

function ModalBodyUniprot({ estructure, uniprotId }: Props) {
    const [type, setType] = useState<"stick" | "cartoon" | "line" | "sphere">(
        "cartoon"
    );

    const htmlElem = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!htmlElem.current) return;

        const viewer = $3Dmol.createViewer(htmlElem.current, {
            backgroundColor: "white",
            antialias: true,
            disableFog: true,
        });

        //ESTRUCTURE
        viewer.addModel(estructure, "pdb");

        viewer.setStyle(
            { model: 0 },
            {
                [type]: { color: "spectrum" },
            }
        );

        viewer.zoomTo();
        viewer.render();
    }, [estructure, type]);

    return (
        <>
            <Row className="p-0">
                <Col sm={12} lg={9} className=" p-0 ">
                    <div
                        ref={htmlElem}
                        style={{
                            width: "100%",
                            height: "400px",
                            position: "relative",
                        }}
                    />
                </Col>
                <Col sm={12} lg={3} className="font-monospace small">
                    <Dropdown3DMolType type={type} setType={setType} />
                    <div className="d-flex justify-content-end py-3">
                        <OverlayTrigger
                            overlay={<Tooltip>Download PDB</Tooltip>}
                        >
                            <Button
                                variant="light"
                                size="sm"
                                onClick={() =>
                                    downloadFile(
                                        estructure,
                                        uniprotId ?? "file.pdb"
                                    )
                                }
                            >
                                <Icon type={"download"} /> DOWNLOAD STRUCTURE
                            </Button>
                        </OverlayTrigger>{" "}
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default ModalBodyUniprot;
