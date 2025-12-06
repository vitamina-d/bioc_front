import { Col, Row } from "react-bootstrap";
import { aminoacidColors } from "../constant/aminoacidColors";

type Props = {
    hseq: string;
    qseq: string;
};

function Secondary({ hseq, qseq }: Props) {
    function splitSequences(hseq: string, qseq: string, size = 40) {
        const blocks = [];
        const max = Math.max(hseq.length, qseq.length);

        for (let i = 0; i < max; i += size) {
            blocks.push({
                h: hseq.slice(i, i + size),
                q: qseq.slice(i, i + size),
                range: `${i + 1} - ${i + size}`,
            });
        }

        return blocks;
    }

    const blocks = splitSequences(hseq, qseq);

    return (
        <Col
            className="rounded border mb-2 bg-light"
            style={{ width: "100%", minWidth: 0, overflow: "auto" }}
        >
            {blocks.map((block, blockIndex) => (
                <div key={blockIndex} className="m-2">
                    <Row className="fw-bold font-monospace">
                        <Col sm={2} style={{ fontSize: "small" }}>
                            {`REF (${block.range})`}{" "}
                        </Col>
                        <Col sm={10}>
                            {block.h.split("").map((aa, i) => (
                                <span
                                    key={i}
                                    className="p-1"
                                    style={{
                                        color: aminoacidColors[aa],
                                        fontSize: "small",
                                    }}
                                >
                                    {aa}
                                </span>
                            ))}
                        </Col>
                    </Row>

                    <Row className="fw-bold font-monospace">
                        <Col sm={2} style={{ fontSize: "small" }}>
                            {`PRED (${block.range})`}{" "}
                        </Col>
                        <Col sm={10}>
                            {block.q.split("").map((aa, i) => (
                                <span
                                    key={i}
                                    className="p-1"
                                    style={{
                                        color: aminoacidColors[aa],
                                        fontSize: "small",
                                    }}
                                >
                                    {aa}
                                </span>
                            ))}
                        </Col>
                    </Row>
                </div>
            ))}
        </Col>
    );
}
export default Secondary;
