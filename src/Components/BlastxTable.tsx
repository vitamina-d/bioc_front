import { Button, Collapse, Table } from "react-bootstrap";
import type { Hit } from "../types/DataBlastx";
import React, { useState } from "react";
import BadgeProtein from "./BadgeProtein";
import { Icon } from "./Icon";

type Props = {
    hits: Hit[];
    handleCompare: (frame: number, pdbId: string, hit: Hit) => void;
    setHit: React.Dispatch<React.SetStateAction<Hit | null>>;
};

function BlastxTable({ hits, handleCompare }: Props) {
    const [openRow, setOpenRow] = useState<number | null>(null);

    return (
        <div
            style={{
                overflowY: "auto",
                overflowX: "auto",
                maxHeight: "55vh",
            }}
        >
            <Table
                className="font-monospace fontsize-sm"
                bordered
                hover
                size="sm"
            >
                <thead
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 2,
                        background: "white",
                    }}
                >
                    <tr>
                        <th>Hit</th>
                        <th>Len</th>

                        <th>Bitscore</th>
                        <th>Score</th>
                        <th>Evalue</th>
                        <th>Identity</th>
                        <th>Positive</th>

                        {/*<th>Chain</th>*/}
                        <th>Name</th>
                        <th>Specie</th>
                        <th>Taxid</th>
                        <th>PDB IDs</th>

                        <th>More</th>
                        <th>Go To</th>
                    </tr>
                </thead>
                <tbody>
                    {hits.map((hit, hit_idx) => {
                        const chains: string[] = [];
                        const names: string[] = [];
                        const species: string[] = [];
                        const taxids: number[] = [];
                        const badges: string[] = [];
                        return (
                            //agregar key
                            <React.Fragment key={hit_idx}>
                                <tr key={hit_idx}>
                                    <td>{hit.num}</td>
                                    <td>{hit.len}</td>
                                    {hit.hsps.map((hsp, hsp_idx) => (
                                        <React.Fragment key={hsp_idx}>
                                            <td>{hsp.bit_score}</td>
                                            <td>{hsp.score}</td>
                                            <td>{hsp.evalue}</td>
                                            <td>{hsp.identity}</td>
                                            <td>{hsp.positive}</td>
                                        </React.Fragment>
                                    ))}
                                    {hit.description.map((item) => {
                                        //console.log("DESCRIPTION");
                                        //const list = item.title.split(",");
                                        const chain: string =
                                            item.title.split(",")[0]; //ok
                                        const name: string = item.title
                                            .replace(chain + ",", "") // - chain
                                            .replace(/\[.*?\]$/, "") // - specie
                                            .trim();

                                        const corchetes =
                                            item.title.match(/\[(.*?)\]$/);
                                        const specie = corchetes
                                            ? corchetes[1]
                                            : "";
                                        //const specie: string = list[1].split(name)[1].trim();

                                        if (!chains.includes(chain)) {
                                            chains.push(chain);
                                        }
                                        if (!names.includes(name)) {
                                            names.push(name);
                                        }
                                        if (!species.includes(specie)) {
                                            species.push(specie);
                                        }
                                        if (!taxids.includes(item.taxid)) {
                                            taxids.push(item.taxid);
                                        }
                                        if (!badges.includes(item.accession)) {
                                            badges.push(item.accession);
                                        }
                                        return <></>;
                                    })}
                                    {/*<td>{chains}</td>*/}
                                    <td>{names}</td>
                                    <td>{species}</td>
                                    <td>{taxids}</td>
                                    <td>
                                        {badges.map((bg) => {
                                            //console.log("BADGE envia -------------",bg);
                                            return (
                                                <BadgeProtein
                                                    key={bg}
                                                    name={bg}
                                                />
                                            );
                                        })}
                                    </td>
                                    <td>
                                        <Button
                                            size="sm"
                                            variant={
                                                openRow === hit_idx
                                                    ? "secondary"
                                                    : "success"
                                            }
                                            onClick={() =>
                                                setOpenRow(
                                                    openRow === hit_idx
                                                        ? null
                                                        : hit_idx
                                                )
                                            }
                                        >
                                            {openRow === hit_idx ? (
                                                <Icon type="morev" /> //hide o show
                                            ) : (
                                                <Icon type="moreh" />
                                            )}
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            size="sm"
                                            variant="primary"
                                            onClick={() =>
                                                handleCompare(
                                                    hit.hsps[0].query_frame,
                                                    hit.description[0].id,
                                                    hit
                                                )
                                            }
                                        >
                                            {" "}
                                            Compare
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={15} className="border-0 p-0">
                                        <Collapse
                                            in={openRow === hit_idx}
                                            className="m-0"
                                        >
                                            <Table
                                                bordered
                                                hover
                                                variant="light"
                                                className="mb-2"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>Sequence</th>
                                                        <th>Align</th>
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
                                                                <td>Query</td>
                                                                <td
                                                                    style={{
                                                                        fontFamily:
                                                                            "monospace",
                                                                    }}
                                                                >
                                                                    {hsp.qseq}
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
                                                                    {hsp.gaps}
                                                                </td>
                                                                <td>-</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Midline</td>
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
                                                                    {hsp.hseq}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        hsp.hit_from
                                                                    }
                                                                    -
                                                                    {hsp.hit_to}
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
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default BlastxTable;
