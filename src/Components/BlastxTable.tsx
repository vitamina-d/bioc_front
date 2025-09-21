import { Badge, Table } from "react-bootstrap";
import type { BlastxReport } from "../types/DataBlastx";
import Header from "./Header";
import BlastxStat from "./BlastxStat";

type Props = {
    data?: BlastxReport;
};

function BlastxTable({ data }: Props) {
    const hits = data?.results.search.hits;
    const stat = data?.results.search.stat;
console.log(data);
    return (
        hits &&
        stat && (
            <>
                <Header
                    title="Blastx"
                    text="Hits"
                    imageSrc="../../public/search-gene.png"
                />
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Hit</th>
                            <th>Len</th>
                            <th>Bitscore</th>
                            <th>Score</th>
                            <th>Evalue</th>
                            <th>Identity</th>
                            <th>Positive</th>
                            {/*<th>Query</th>
                            <th>Hit</th>
                            <th>Midline</th>*/}
                            <th>Description</th>
                            <th>Taxid</th>
                            <th>Specie</th>
                            <th>PDB ID</th>
                        </tr>
                    </thead>
                    <tbody
                        style={{
                            fontFamily: "monospace",
                            marginBottom: "8px",
                        }}
                    >
                        {hits.map((hit) => {
                            const text = hit.description[0].title;
                            const description = text
                                .split(",")[1]
                                .split("[")[0]
                                .trim();
                            const match = text.match(/\[(.*?)\]/); //corchetes
                            const especie = match ? match[1] : null;

                            const pdbChains = new Map<string, string[]>();

                            hit.description.forEach((item) => {
                                //2QRO_C
                                const [pdbId, chain] =
                                    item.accession.split("_");
                                if (!pdbChains.has(pdbId)) {
                                    pdbChains.set(pdbId, []);
                                }
                                pdbChains.get(pdbId)!.push(chain);
                            });
                            return (
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
                                            {/*<td>{hsp.qseq}</td>
                                            <td>{hsp.hseq}</td>
                                            <td>{hsp.midline}</td>*/}
                                        </>
                                    ))}
                                    <td>{description}</td>
                                    <td>{hit.description[0].taxid}</td>
                                    <td>{especie}</td>
                                    <td>
                                        {hit.description.map((item) => (
                                            <Badge className="ms-1" bg="dark">
                                                {item.accession}
                                            </Badge>
                                        ))}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <BlastxStat data={stat} />
            </>
        )
    );
}

export default BlastxTable;
/*
                           
                            
 
*/
