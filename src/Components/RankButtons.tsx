import { Col, ListGroup, Row } from "react-bootstrap";
import TableRanks from "./TableRanks";
import type { ProteinRanks } from "../types/ResponseFolding";

type Props = {
    ranks: ProteinRanks;
    selectRankToCompare: (rank: string) => void;
};

function RankButtons({ ranks, selectRankToCompare }: Props) {
    return (
        <ListGroup.Item>
            <Row>
                <Col xs={3}>UNCERTAINTY</Col>
                <Col xs={9}>
                    <TableRanks
                        data={ranks}
                        selectRankToCompare={selectRankToCompare}
                    />
                </Col>
            </Row>
            <Row className="d-flex justify-content-center mt-3">
                Select rank to compare structures.
            </Row>
        </ListGroup.Item>
    );
}

export default RankButtons;
