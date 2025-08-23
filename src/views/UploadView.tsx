import { Card } from "react-bootstrap";
import Header from "../Components/Header";
import ReadFile from "../Components/ReadFile";
import { useState } from "react";

function UploadView() {
    const [content, setContent] = useState<string>("");

    return (
        <Card className="p-3 my-3 ">
            <Header
                title="Subir FASTA"
                text="subtitle."
                imageSrc="../../public/gene.png"
            />
            <ReadFile content={content} setContent={setContent} />
        </Card>
    );
}

export default UploadView;
