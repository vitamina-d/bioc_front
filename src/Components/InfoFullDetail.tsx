import {
    Badge,
    Col,
    ListGroup,
    Modal,
    OverlayTrigger,
    Row,
    Tooltip,
} from "react-bootstrap";
import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import type {
    DataFullDetail,
    DataSequence,
    DataStats,
    Location,
} from "../types/DataPlumber";
import React, { useState, type FormEvent } from "react";
import ButtonOverlay from "./ButtonOverlay";
import { GetPercent, GetSequenceByRange } from "../services/PlumberServices";
import { useSpinnerContext } from "../context/SpinnerContext";
import { useToastContext } from "../context/ToastContext";
import type { Response } from "../types/Response";
import ModalBasic from "./ModalBasic";
import SequenceShow from "./SequenceShow";
import PercentPlots from "./PercentPlots";
import type { Sequence } from "../types/DataPython";
import { GetComplement } from "../services/PythonServices";

type Props = {
    dataPublic?: ResponsePublicSummary;
    dataPlumber?: DataFullDetail;
    getUniprot: (event: FormEvent, select_unip: string) => Promise<void>;
    selectedUniprot: string;
};

function InfoFullDetail({
    dataPublic,
    dataPlumber,
    getUniprot,
    selectedUniprot,
}: Props) {
    const { showSpinner, hideSpinner } = useSpinnerContext();
    const { showToast } = useToastContext();

    const [title, setTitle] = useState<string>("");
    const [sequence, setSequence] = useState<string>("");
    const [showSequence, setShowSequence] = useState<boolean>(false);
    const [dataStats, setDataStats] = useState<DataStats | null>(null);

    //GET SEQUENCE
    const getSequence = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        range: Location
    ) => {
        event.preventDefault();
        console.log("PLUMBER: range:", range);
        setTitle(`Sequence (Strand ${range.strand})`);
        setDataStats(null);
        showSpinner();

        const chr: string = range.seqnames.startsWith("chr")
            ? range.seqnames.substring(3)
            : range.seqnames;

        const response: Response<DataSequence[]> | null =
            await GetSequenceByRange(chr, range.start, range.end, showToast);

        if (
            !response ||
            !response.data ||
            !response.data[0] ||
            !response.data[0].sequence
        ) {
            hideSpinner();
            return;
        }

        if (range.strand == "-") {
            const toReverse: boolean = true;
            const toComplement: boolean = false;

            const reverse: Response<Sequence> = await GetComplement(
                response.data[0].sequence,
                toReverse,
                toComplement
            );
            setSequence(reverse.data.sequence);
        } else {
            setSequence(response.data[0].sequence);
        }

        setShowSequence(true);
        hideSpinner();
    };

    //GET PERCENT
    const getStats = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        showSpinner();

        const response: Response<DataStats> | null = await GetPercent(
            sequence,
            showToast
        );

        if (!response || !response.data) {
            hideSpinner();
            return;
        }
        setDataStats(response.data);
        hideSpinner();
    };

    return (
        <>
            {dataPublic && (
                <>
                    <ListGroup.Item>
                        <Row>
                            <Col xs={3}>Summary</Col>
                            <Col xs={9}>{dataPublic.summary}</Col>
                        </Row>
                    </ListGroup.Item>
                </>
            )}
            {dataPlumber && (
                <>
                    <ListGroup.Item>
                        <Row>
                            <Col xs={3}>Cytogenetic Location</Col>
                            <Col xs={9}>{dataPlumber.citogenetic} </Col>
                        </Row>
                    </ListGroup.Item>
                    {dataPlumber.location.length > 0 &&
                        dataPlumber.location.map((range, idx) => (
                            <React.Fragment key={`location${idx}`}>
                                <ListGroup.Item>
                                    <Row className="d-flex align-items-center ">
                                        <Col xs={3}>Location {idx}</Col>
                                        <Col xs={7}>
                                            {`${range.seqnames}: ${
                                                range.start
                                            } to ${range.end} (lenght: ${
                                                range.length
                                            }) | Strand ${
                                                range.strand == "-"
                                                    ? "3′ → 5′ (-)"
                                                    : "5′ → 3′ (+)"
                                            }`}
                                        </Col>
                                        <Col xs={2} className="d-flex justify-content-end ">
                                            <ButtonOverlay
                                                textHover="Sequence"
                                                typeIcon="finger"
                                                onClick={(event) =>
                                                    getSequence(event, range)
                                                }
                                                variant="outline-success"
                                                size="lg"
                                            />
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </React.Fragment>
                        ))}

                    {dataPlumber.ensembl_id_gene.length > 0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col xs={3}>Ensembl Id Gene</Col>
                                <Col xs={9}>
                                    {dataPlumber.ensembl_id_gene.map(
                                        (prot, idx) => (
                                            <React.Fragment key={idx}>
                                                <Badge className="bg-prymary m-1">
                                                    {prot}
                                                </Badge>
                                            </React.Fragment>
                                        )
                                    )}{" "}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}
                    {dataPlumber.ensembl_id_protein.length > 0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col xs={3}>Ensembl Id Protein</Col>
                                <Col xs={9}>
                                    {dataPlumber.ensembl_id_protein.map(
                                        (prot, idx) => (
                                            <React.Fragment key={idx}>
                                                <Badge className="bg-success m-1">
                                                    {prot}
                                                </Badge>
                                            </React.Fragment>
                                        )
                                    )}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}
                    {dataPlumber.uniprot_ids.length > 0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col xs={3}>UniProt IDs</Col>
                                <Col xs={9}>
                                    {dataPlumber.uniprot_ids.map(
                                        (unip, idx) => (
                                            <React.Fragment key={idx}>
                                                <OverlayTrigger
                                                    overlay={
                                                        <Tooltip>
                                                            View structure
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Badge
                                                        className={`m-1 bg-${
                                                            selectedUniprot ==
                                                            unip
                                                                ? "success"
                                                                : "warning"
                                                        }`}
                                                        onClick={(e) =>
                                                            getUniprot(e, unip)
                                                        }
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        {unip}
                                                    </Badge>
                                                </OverlayTrigger>
                                            </React.Fragment>
                                        )
                                    )}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}

                    {/* LA SEQUENCE */}
                    <ModalBasic
                        modalShow={showSequence}
                        setModalShow={setShowSequence}
                        size={"xl"}
                        title={title}
                    >
                        <Modal.Body>
                            {sequence != "" && (
                                <>
                                    <SequenceShow sequence={sequence} />
                                    {dataStats ? (
                                        <PercentPlots dataStats={dataStats} />
                                    ) : (
                                        <ButtonOverlay
                                            textHover="Get Stats"
                                            typeIcon="pie"
                                            onClick={(event) => getStats(event)}
                                            variant="outline-success"
                                            size="lg"
                                        />
                                    )}
                                </>
                            )}
                        </Modal.Body>
                    </ModalBasic>
                </>
            )}
        </>
    );
}

export default InfoFullDetail;
