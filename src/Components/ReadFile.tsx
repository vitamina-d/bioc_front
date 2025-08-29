import { type ChangeEvent } from "react";
import TextArea from "./TextArea";

type Props = {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
};

function ReadFile({ content, setContent }: Props) {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                const text = e.target?.result as string;
                setContent(text);
            };
        }
    };

    return (
        <div>
            {content && (
                <>
                    {/*
                    <pre
                        className="my-3 p-3 bg-light rounded border overflow-auto"
                        style={{
                            maxHeight: "300px",
                        }}
                    >
                        {content}
                    </pre>
                    */}
                    <TextArea
                        title="name"
                        sequence={content}
                        setSequence={setContent}
                    />
                </>
            )}
            <input type="file" accept=".fasta" onChange={handleFileChange} />
        </div>
    );
}

export default ReadFile;
