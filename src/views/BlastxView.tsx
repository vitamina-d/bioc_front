import { Button, Card } from "react-bootstrap";
import Header from "../Components/Header";
import { PostBlastx } from "../services/BlastServices";
import type { ResponsePlumber } from "../types/ResponsePlumber";
import type { BlastxReport } from "../types/DataBlastx";
import { useState } from "react";
import BlastTable from "../Components/BlastxTable";

function BlastxView() {
    const [blastx, setBlastx] = useState<BlastxReport | null>(null);
    const [query, setQuery] = useState<string>("");

    const fetchData = async () => {
        const response: ResponsePlumber<BlastxReport> = await PostBlastx(query);
        setBlastx(response.data);
    };

    return (
        <Card className="p-3 my-3">
            <Header
                title="Blastx"
                text="Hits"
                imageSrc="../../public/search-gene.png"
            />
            <Card.Header>
                <div className="input-group mb-3 w-auto">
                    <label className="input-group-text">QUERY</label>
                    <input
                        type="string"
                        className="form-control"
                        id="inputQuery"
                        placeholder={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <Button onClick={fetchData}>BLASTX</Button>
            </Card.Header>
            <Card.Body>{blastx ? <BlastTable data={blastx} /> : ""}</Card.Body>
        </Card>
    );
}

export default BlastxView;
