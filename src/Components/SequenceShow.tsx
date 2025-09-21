import TextArea from "./TextArea";
import ButtonOverlay from "./ButtonOverlay";
import { Stack } from "react-bootstrap";

type Props = {
    sequence: string;
};

function SequenceShow({ sequence }: Props) {
    let row = Math.round(sequence.length / 125);
    row = Math.min(row, 20)
    const copySequence = () => {
        navigator.clipboard.writeText(sequence);
    };

    return (
        <Stack className="d-flex flex-column">
            <TextArea
                title={"Sequence"}
                sequence={sequence}
                readOnly={true}
                rows={row}
            />
            <Stack
                direction="horizontal"
                gap={2}
                className="d-flex justify-content-end pb-2"
            >
                <ButtonOverlay
                    textHover={"Copy"}
                    sequence={sequence}
                    onClick={copySequence}
                    typeIcon={"copy"}
                    size="sm"
                    variant="outline-secondary"
                />
            </Stack>
        </Stack>
    );
}

export default SequenceShow;
