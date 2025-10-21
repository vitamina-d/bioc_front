import TextArea from "./TextArea";
import ButtonOverlay from "./ButtonOverlay";
import { Stack } from "react-bootstrap";

type Props = {
    sequence: string;
    row?: number;
};

function SequenceShow({ sequence, row }: Props) {
    let calculateRow = Math.round(sequence.length / 125);
    calculateRow = Math.max(Math.min(calculateRow, 20), 4);
    const copySequence = () => {
        navigator.clipboard.writeText(sequence);
    };

    return (
        <Stack className="d-flex flex-column">
            <TextArea
                title={"Sequence"}
                sequence={sequence}
                readOnly={true}
                rows={row ? row : calculateRow}
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
