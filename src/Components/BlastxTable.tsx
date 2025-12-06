import {
    Badge,
    Button,
    Collapse,
    OverlayTrigger,
    Table,
    Tooltip,
} from "react-bootstrap";
import type { Hit } from "../types/DataBlastx";
import React, { useState } from "react";
import { Icon } from "./Icon";

type Props = {
    hits: Hit[];
    setHit: React.Dispatch<React.SetStateAction<Hit | null>>;
};

function BlastxTable({ hits, setHit }: Props) {
    const [openRow, setOpenRow] = useState<number | null>(null);

    return (
        <div
            style={{
                overflowY: "auto",
                overflowX: "auto",
                maxHeight: "55vh", //55% de alto
            }}
        >
            <Table
                className="font-monospace fontsize-sm text-center"
                bordered
                hover
                size="sm"
                style={{
                    fontSize: "0.8rem",
                }}
            >
                <thead
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 2,
                        background: "white",
                    }}
                >
                    <tr key={"blastxtable"}>
                        <th>Hit</th>
                        <OverlayTrigger
                            overlay={
                                <Tooltip>
                                    Hit Length - Longitud de la proteina
                                    objetivo
                                </Tooltip>
                            }
                        >
                            <th>Len</th>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Bitscore</Tooltip>}>
                            <th>BS</th>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Score</Tooltip>}>
                            <th>S</th>
                        </OverlayTrigger>
                        <OverlayTrigger
                            overlay={
                                <Tooltip>
                                    Probabilidad de coincidencia aleatoria
                                </Tooltip>
                            }
                        >
                            <th>E-value</th>
                        </OverlayTrigger>
                        <OverlayTrigger
                            overlay={
                                <Tooltip>
                                    Identity - Porcentaje de identidades exactas
                                </Tooltip>
                            }
                        >
                            <th>Id%</th>
                        </OverlayTrigger>
                        <OverlayTrigger
                            overlay={
                                <Tooltip>
                                    Positive - Porcentaje de coincidencias
                                    conservadas
                                </Tooltip>
                            }
                        >
                            <th>Pos%</th>
                        </OverlayTrigger>
                        <th>Name</th>
                        <th>Specie</th>
                        <OverlayTrigger
                            overlay={
                                <Tooltip>
                                    Identificador taxonómico NCBI
                                </Tooltip>
                            }
                        >
                            <th>TaxID</th>
                        </OverlayTrigger>
                        <th>Gene</th>
                        <OverlayTrigger
                            overlay={<Tooltip>Identificador en la BD</Tooltip>}
                        >
                            <th>Accession</th>
                        </OverlayTrigger>
                        <th>More</th>
                        <th>Go</th>
                    </tr>
                </thead>
                <tbody>
                    {hits.map((hit, hit_idx) => {
                        const name: string[] = [];
                        const specie: string[] = [];
                        const taxid: string[] = [];
                        const gen: string[] = [];
                        const protEvidence: string[] = [];
                        const accession: string[] = [];

                        return (
                            //agregar key
                            <React.Fragment key={`hit-${hit_idx}`}>
                                <tr key={`row-${hit_idx}`}>
                                    <td>{hit.num}</td>
                                    <td>{hit.len}</td>
                                    <td>{hit.hsps[0].bit_score}</td>
                                    <td>{hit.hsps[0].score}</td>
                                    <td>{hit.hsps[0].evalue}</td>
                                    <td>{hit.hsps[0].identity}%</td>
                                    <td>{hit.hsps[0].positive}%</td>
                                    {hit.description.map((item) => {
                                        accession.push(item.accession);
                                        //7-dehydrocholesterol reductase OS=Mus musculus OX=10090 GN=Dhcr7 PE=1 SV=1
                                        name.push(item.title.split("OS=")[0]);
                                        specie.push(
                                            item.title
                                                .split("OS=")[1]
                                                .split("OX=")[0]
                                        );
                                        if (item.title.includes("GN=")) {
                                            taxid.push(
                                                item.title
                                                    .split("OX=")[1]
                                                    .split("GN=")[0]
                                            );
                                            gen.push(
                                                item.title
                                                    .split("GN=")[1]
                                                    .split("PE=")[0]
                                            );
                                            protEvidence.push(
                                                item.title
                                                    .split("PE=")[1]
                                                    .split("SV")[0]
                                            );
                                        } else {
                                            taxid.push(
                                                item.title
                                                    .split("OX=")[1]
                                                    .split("PE=")[0]
                                            );
                                            protEvidence.push(
                                                item.title
                                                    .split("PE=")[1]
                                                    .split("SV")[0]
                                            );
                                        }
                                        return <></>;
                                    })}
                                    <td>{name}</td>
                                    <td>{specie}</td>
                                    <td>{taxid}</td>
                                    <td>
                                        {gen.map((bg, idx) => {
                                            return (
                                                <Badge
                                                    className="ms-1"
                                                    bg="warning"
                                                    key={`gen-${bg}${idx}`}
                                                >
                                                    {bg}
                                                </Badge>
                                            );
                                        })}
                                    </td>
                                    <td>
                                        {accession.map((acc, idx) => {
                                            return (
                                                <Badge
                                                    className="ms-1"
                                                    bg="danger"
                                                    key={`gen-${acc}${idx}`}
                                                >
                                                    {acc}
                                                </Badge>
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
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip>Compare hit</Tooltip>
                                            }
                                        >
                                            <Button
                                                size="sm"
                                                variant="primary"
                                                onClick={() => setHit(hit)}
                                            >
                                                <Icon type="shuffle" />
                                            </Button>
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                                <tr key="tr-Collapse">
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
                                                    <tr key="tr-Header">
                                                        <th>Sequence</th>
                                                        <th>Align</th>
                                                        <th>Range</th>
                                                        <th>Frame</th>
                                                        <th>Gaps</th>
                                                        <th>Align Len</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {hit.hsps.map(
                                                        (hsp, hsp_idx) => (
                                                            <>
                                                                <tr
                                                                    key={`hsp-${hsp_idx}`}
                                                                >
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
                                                                <tr key="tr-Midline">
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
                                                                <tr key="tr-Hit">
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
                                                        )
                                                    )}
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
