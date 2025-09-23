import { Card } from "react-bootstrap";
import Header from "../Components/Header";
import type { BlastxReport } from "../types/DataBlastx";
import { useState } from "react";
import BlastTable from "../Components/BlastxTable";
import BlastxSearcher from "../Components/BlastxSearch";

function BlastxView() {
    const [blastx, setBlastx] = useState<BlastxReport | null>(null);

    return (
        <Card className="p-3 my-3">
            <Header
                title="Blastx"
                text="Hits"
                imageSrc="../../public/search-gene.png"
            />
                <BlastxSearcher setBlastx={setBlastx} />
            <Card.Body>{blastx ? <BlastTable data={blastx} /> : ""}</Card.Body>
        </Card>
    );
}

export default BlastxView;
