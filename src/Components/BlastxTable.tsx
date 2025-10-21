import { Button, Collapse, Table } from "react-bootstrap";
import type { BlastxReport } from "../types/DataBlastx";
import BlastxStat from "./BlastxStat";
import { useState } from "react";
import BadgeProtein from "./BadgeProtein";
import { Icon } from "./Icon";

type Props = {
    data?: BlastxReport;
    handleCompare: (frame: number, pdbId: string) => void;
};

function BlastxTable({ data, handleCompare }: Props) {
    const [openRow, setOpenRow] = useState<number | null>(null);

    const hits = data?.results.search.hits;
    const stat = data?.results.search.stat;
    console.log(data);

    return (
        <>
            {hits ? (
                <div className="table-responsive">
                    <Table
                        className="font-monospace fontsize-sm table-responsive"
                        bordered
                        hover
                        size="sm"
                    >
                        <thead>
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
                                    <>
                                        <tr key={hit.num}>
                                            <td>{hit.num}</td>
                                            <td>{hit.len}</td>
                                            {hit.hsps.map((hsp) => (
                                                <>
                                                    <td>{hsp.bit_score}</td>
                                                    <td>{hsp.score}</td>
                                                    <td>{hsp.evalue}</td>
                                                    <td>{hsp.identity}</td>
                                                    <td>{hsp.positive}</td>
                                                </>
                                            ))}
                                            {hit.description.map((item) => {
                                                console.log("DESCRIPTION");
                                                //const list = item.title.split(",");
                                                const chain: string =
                                                    item.title.split(",")[0]; //ok
                                                const name: string = item.title
                                                    .replace(chain + ",", "") // - chain
                                                    .replace(/\[.*?\]$/, "") // - specie
                                                    .trim();

                                                const corchetes =
                                                    item.title.match(
                                                        /\[(.*?)\]$/
                                                    );
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
                                                if (
                                                    !taxids.includes(item.taxid)
                                                ) {
                                                    taxids.push(item.taxid);
                                                }
                                                if (
                                                    !badges.includes(
                                                        item.accession
                                                    )
                                                ) {
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
                                                    console.log(
                                                        "BADGE envia -------------",
                                                        bg
                                                    );
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
                                                            hit.hsps[0]
                                                                .query_frame,
                                                            hit.description[0]
                                                                .id
                                                        )
                                                    }
                                                >
                                                    {" "}
                                                    Compare
                                                </Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                colSpan={15}
                                                className="border-0 p-0"
                                            >
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
                                                                <th>
                                                                    Sequence
                                                                </th>
                                                                <th>Align</th>
                                                                <th>Range</th>
                                                                <th>Frame</th>
                                                                <th>Gaps</th>
                                                                <th>
                                                                    Align Len
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {hit.hsps.map(
                                                                (hsp) => (
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
                                                                            <td>
                                                                                -
                                                                            </td>
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
                                                                            <td>
                                                                                -
                                                                            </td>
                                                                            <td>
                                                                                -
                                                                            </td>
                                                                            <td>
                                                                                -
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    hsp.align_len
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                Hit
                                                                            </td>
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
                                                                            <td>
                                                                                -
                                                                            </td>
                                                                            <td>
                                                                                -
                                                                            </td>
                                                                            <td>
                                                                                -
                                                                            </td>
                                                                        </tr>
                                                                    </>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </Table>
                                                </Collapse>
                                            </td>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <p>NO HITS </p>
            )}
            {stat ? <BlastxStat data={stat} /> : ""}
        </>
    );
}

export default BlastxTable;
