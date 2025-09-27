import { Button, Form } from "react-bootstrap";
import type { BlastxReport } from "../types/DataBlastx";
import type { ResponsePlumber } from "../types/ResponsePlumber";
import { PostBlastx } from "../services/BlastServices";
import { useState, type FormEvent } from "react";
import FileUp from "./FileUp";
import type { FastaDictionary } from "../types/FastaDictionary";
import FastaReadTable from "./FastaReadTable";

type Props = {
    setBlastx: React.Dispatch<React.SetStateAction<BlastxReport | null>>;
};

function BlastxSearcher({ setBlastx }: Props) {
    const [query, setQuery] = useState<string>("");
    /////
        const [dictionary, setDictionary] = useState<FastaDictionary>({});
        const [showFileTable, setShowFileTable] = useState<boolean>(false);
    //////

    const fetchData = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("QUERY: ", query)
        const response: ResponsePlumber<BlastxReport> = await PostBlastx(query.trim());
        setBlastx(response.data);
    };

    let row = Math.round(query.length / 125);
    row = Math.max(Math.min(row, 20), 4);

    return (
        <div className="row mx-1 ">
            <Form onSubmit={(e) => fetchData(e)}>
                <div className="input-group mb-3 w-auto">
                    <label className="input-group-text">QUERY</label>

                    <Form.Control
                        className="py-1 px-2 font-monospace text-muted "
                        as="textarea"
                        rows={row}
                        size="sm"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <label className="input-group-text p-0">
                        <Button
                            variant="light"
                            type="submit"
                            className="rounded-0"
                        >
                            BLASTX
                        </Button>
                    </label>
                </div>
            </Form>
            <FileUp setShowTable={setShowFileTable} setDictionary={setDictionary} />
            {dictionary ? <FastaReadTable setSequence={setQuery} showTable={showFileTable} dictionary={dictionary}  /> : <></> }
        </div>
    );
}

export default BlastxSearcher;
