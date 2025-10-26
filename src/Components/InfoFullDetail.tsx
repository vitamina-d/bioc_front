import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import type { DataFullDetail } from "../types/DataPlumber";
import React from "react";

type Props = {
    dataPublic?: ResponsePublicSummary;
    dataPlumber?: DataFullDetail;
};

function InfoFullDetail({ dataPublic, dataPlumber }: Props) {
    return (
        <>
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
                    {dataPlumber.location.length > 0
                        ? dataPlumber.location.map((range, idx) => (
                              <React.Fragment key={`location${idx}`}>
                                  <ListGroup.Item>
                                      <Row className="d-flex ">
                                          <Col xs={3}>Location {idx}</Col>
                                          <Col xs={9}>
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
                                      </Row>
                                  </ListGroup.Item>
                              </React.Fragment>
                          ))
                        : ""}

                    {dataPlumber.ensembl_id_gene.length > 0 ? (
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
                    ) : (
                        ""
                    )}
                    {dataPlumber.ensembl_id_protein.length > 0 ? (
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
                    ) : (
                        ""
                    )}
                    {dataPlumber.uniprot_ids.length > 0 ? (
                        <ListGroup.Item>
                            <Row>
                                <Col xs={3}>UniProt IDs</Col>
                                <Col xs={9}>
                                    {dataPlumber.uniprot_ids.map(
                                        (unip, idx) => (
                                            <React.Fragment key={idx}>
                                                <Badge className="bg-warning m-1">
                                                    {unip}
                                                </Badge>
                                            </React.Fragment>
                                        )
                                    )}
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
        </>
    );
}

export default InfoFullDetail;
