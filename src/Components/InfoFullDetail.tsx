import { Col, Accordion, ListGroup, Row } from "react-bootstrap";
import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import type { DataFullDetail, DataStats } from "../types/DataPlumber";
import ButtonOverlay from "./ButtonOverlay";
import type { Response } from "../types/Response";
import { GetStats } from "../services/BioconductorServices";
import SequenceShow from "./SequenceShow";
import PercentPlots from "./PercentPlots";
import { useState } from "react";
import { useParams } from "react-router-dom";

type Props = {
    dataPublic?: ResponsePublicSummary;
    dataPlumber?: DataFullDetail;
};

function InfoFull({ dataPublic, dataPlumber }: Props) {
    const { entrezId } = useParams();

    const [dataStats, setDataStats] = useState<DataStats | null>(null);

    const getStats = async () => {
        try {
            const seqAndStats: Response<DataStats> = await GetStats(
                entrezId!,
                true
            );
            console.log(seqAndStats);
            console.log(seqAndStats.data);
            setDataStats(seqAndStats.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <ListGroup className="mb-3" variant="flush">
            {dataPublic ? (
                <>
                    <ListGroup.Item>
                        <Row>
                            <Col xs={3}>Summary</Col>
                            <Col xs={9}>{dataPublic.summary}</Col>
                        </Row>
                    </ListGroup.Item>
                </>
            ) : (
                <></>
            )}
            {dataPlumber ? (
                <>
                    <ListGroup.Item>
                        <Row>
                            <Col xs={3}>Cytogenetic Location</Col>
                            <Col xs={9}>{dataPlumber.citogenetic} </Col>
                        </Row>
                    </ListGroup.Item>
                    {dataPlumber.location.map((range, idx) => (
                        <>
                            <ListGroup.Item key={`location${idx}`}>
                                <Row className="d-flex ">
                                    <Col xs={3}>Location {`${idx + 1}`}</Col>
                                    <Col xs={8}>
                                        {`${range.seqnames}: ${
                                            range.start
                                        } to ${range.end} | Lenght: ${
                                            range.length
                                        } | Strand: ${
                                            range.strand == "-"
                                                ? "Strand: 3′ → 5′ (-)"
                                                : "Strand: 5′ → 3′ (+)"
                                        }`}
                                    </Col>

                                    <Col lg={1} className="text-center">
                                        <ButtonOverlay
                                            textHover={"Sequence"}
                                            typeIcon={"finger"}
                                            onClick={getStats}
                                            variant="outline-primary"
                                            size="lg"
                                        />
                                    </Col>
                                </Row>
                                {/* LOS STATS */}
                                {dataStats ? (
                                    <Accordion
                                        className="mx-5 my-1"
                                        defaultActiveKey="0"
                                    >
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                                Sequence and Stats
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <SequenceShow
                                                    row={4}
                                                    sequence={
                                                        dataStats.sequence
                                                    }
                                                />
                                                <PercentPlots
                                                    dataStats={dataStats}
                                                />
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                ) : (
                                    ""
                                )}
                            </ListGroup.Item>
                        </>
                    ))}

                    {dataPlumber.ensembl_id_gene ? (
                        <ListGroup.Item>
                            <Row>
                                <Col xs={3}>Ensembl Id Gene</Col>
                                <Col xs={9}>
                                    {dataPlumber.ensembl_id_gene?.join(", ")}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ) : (
                        ""
                    )}
                    {dataPlumber.ensembl_id_protein ? (
                        <ListGroup.Item>
                            <Row>
                                <Col xs={3}>Ensembl Id Protein</Col>
                                <Col xs={9}>
                                    {dataPlumber.ensembl_id_protein?.join(", ")}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ) : (
                        ""
                    )}
                    {dataPlumber.uniprot_ids ? (
                        <ListGroup.Item>
                            <Row>
                                <Col xs={3}>UniProt IDs</Col>
                                <Col xs={9}>
                                    {dataPlumber.uniprot_ids?.join(", ")}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ) : (
                        ""
                    )}
                </>
            ) : (
                <></>
            )}
        </ListGroup>
    );
}

export default InfoFull;
