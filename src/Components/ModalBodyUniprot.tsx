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
                [type]: {color:'spectrum'},
            }
        );

        viewer.zoomTo();
        viewer.render();
    }, [estructure, type]);

    return (
        <Row>
            <Col md={3} className="border-end pe-3 font-monospace small">
                <Dropdown3DMolType type={type} setType={setType} />
                <OverlayTrigger overlay={<Tooltip>Download PDB</Tooltip>}>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                            downloadFile(estructure, uniprotId ?? "file.pdb")
                        }
                    >
                        <Icon type={"download"} />
                    </Button>
                </OverlayTrigger>
            </Col>
            <Col md={9} className="border-end pe-3">
                <div
                    ref={htmlElem}
                    style={{
                        width: "100%",
                        height: "400px",
                        position: "relative",
                    }}
                />
            </Col>
        </Row>
    );
}

export default ModalBodyUniprot;
