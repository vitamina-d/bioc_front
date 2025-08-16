type Props = {
    sequence: string;
};

function SequenceViewer({ sequence }: Props) {
    console.log(sequence);

    return (
        <div className=" bg-light rounded my-3">
            {sequence && (
                <pre
                    className="my-3 p-3 bg-light rounded border overflow-auto"
                    style={{
                        maxHeight: "300px",
                    }}
                >
                    {sequence}
                </pre>
            )}
        </div>
    );
}

export default SequenceViewer;
