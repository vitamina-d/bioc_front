import { Badge, Button, Collapse, Table } from "react-bootstrap";
import type { BlastxReport } from "../types/DataBlastx";
import BlastxStat from "./BlastxStat";
import { useState } from "react";

type Props = {
    data?: BlastxReport;
};

function BlastxTable({ data }: Props) {
    const [openRow, setOpenRow] = useState<number | null>(null);

    const hits = data?.results.search.hits;
    const stat = data?.results.search.stat;
    console.log(data);

    return (
            <>
                {hits ? <Table className="font-monospace fontsize-sm" bordered hover responsive >
                    <thead>
                        <tr>
                            <th>Hit</th>
                            <th>Len</th>
                            <th>Bitscore</th>
                            <th>Score</th>
                            <th>Evalue</th>
                            <th>Identity</th>
                            <th>Positive</th>
                            <th>Description</th>
                            <th>Taxid</th>
                            <th>Specie</th>
                            <th>PDB ID TODO</th>
                            <th>More</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hits.map((hit, hit_idx) => {
                            const text = hit.description[0].title;
                            const description = text
                                .split(",")[1]
                                .split("[")[0]
                                .trim();
                            const match = text.match(/\[(.*?)\]/); //corchetes
                            const especie = match ? match[1] : null;

                            return (
                                <>
                                    {" "}
                                    <tr key={hit.num}>
                                        <td>{hit.num}</td>
                                        <td>{hit.len}</td>
                                        {hit.hsps.map((hsp, hsp_idx) => (
                                            <div key={hsp_idx} >
                                                <td>{hsp.bit_score}</td>
                                                <td>{hsp.score}</td>
                                                <td>{hsp.evalue}</td>
                                                <td>{hsp.identity}</td>
                                                <td>{hsp.positive}</td>
                                            </div>
                                        ))}
                                        <td>{description}</td>
                                        <td>{hit.description[0].taxid}</td>
                                        <td>{especie}</td>
                                        <td>
                                            {hit.description.map((item) => (
                                                <Badge
                                                    key={item.id}
                                                    className="ms-1"
                                                    bg="dark"
                                                >
                                                    {item.accession}
                                                </Badge>
                                            ))}
                                        </td>
                                        <td>
                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    setOpenRow(
                                                        openRow === hit_idx
                                                            ? null
                                                            : hit_idx
                                                    )
                                                }
                                            >
                                                {openRow === hit_idx
                                                    ? "Hide"
                                                    : "Show"}
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            colSpan={12}
                                            className="border-0 p-0"
                                        >
                                            <Collapse in={openRow === hit_idx}>
                                                <Table bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>Sequence</th>
                                                            <th>Align TODO</th>
                                                            <th>Range</th>
                                                            <th>Frame</th>
                                                            <th>Gaps</th>
                                                            <th>Align Len</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {hit.hsps.map((hsp) => (
                                                            <>
                                                                <tr>
                                                                    <td>
                                                                        Query
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            fontFamily:
                                                                                "monospace",
                                                                        }}
                                                                    >
                                                                        {
                                                                            hsp.qseq
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            hsp.query_from
                                                                        }
                                                                        -
                                                                        {
                                                                            hsp.query_to
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            hsp.query_frame
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            hsp.gaps
                                                                        }
                                                                    </td>
                                                                    <td>-</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Midline
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            fontFamily:
                                                                                "monospace",
                                                                        }}
                                                                    >
                                                                        {
                                                                            hsp.midline
                                                                        }
                                                                    </td>
                                                                    <td>-</td>
                                                                    <td>-</td>
                                                                    <td>-</td>
                                                                    <td>
                                                                        {
                                                                            hsp.align_len
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Hit</td>
                                                                    <td
                                                                        style={{
                                                                            fontFamily:
                                                                                "monospace",
                                                                        }}
                                                                    >
                                                                        {
                                                                            hsp.hseq
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            hsp.hit_from
                                                                        }
                                                                        -
                                                                        {
                                                                            hsp.hit_to
                                                                        }
                                                                    </td>
                                                                    <td>-</td>
                                                                    <td>-</td>
                                                                    <td>-</td>
                                                                </tr>
                                                            </>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </Collapse>
                                        </td>
                                    </tr>
                                </>
                            );
                        })}
                    </tbody>
                </Table> : <p>NO HITS </p>
                }
                {stat ? <BlastxStat data={stat} />  : ""}
            </>
        )
    ;
}

export default BlastxTable;
