import {
    Badge,
    Button,
    Form,
    InputGroup,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import type { DataPlumberSequence } from "../types/ResponsePlumberSequence";

type Props = {
    data: DataPlumberSequence;
};

function SequenceViewer({ data }: Props) {
    const copySequence = () => {
        navigator.clipboard.writeText(data.sequence);
        console.log("copied: " + data);
    };

    return (
        data && (
            <div className=" mx-3 pb-3 pt-3 ">
                <InputGroup className="mb-3">
                    <InputGroup.Text>Sequence</InputGroup.Text>
                    <Form.Control
                        className="py-1 px-2"
                        as="textarea"
                        rows={5}
                        size="sm"
                        value={data.sequence}
                        readOnly
                    />
                </InputGroup>
                <div className="d-flex justify-content-end	">
                    <OverlayTrigger overlay={<Tooltip>Copy</Tooltip>}>
                        <span className="d-inline-block">
                            <Button
                                className="align-items-center"
                                size="sm"
                                variant="dark"
                                onClick={copySequence}
                            >
                                <div className="d-flex align-items-start">
                                    <Badge bg="secondary" className="me-2">
                                        {data.sequence_length}
                                    </Badge>
                                    <svg
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                    >
                                        <path d="M10 1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zm-5 0A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1A1.5 1.5 0 0 1 9.5 4h-3A1.5 1.5 0 0 1 5 2.5zm-2 0h1v1A2.5 2.5 0 0 0 6.5 5h3A2.5 2.5 0 0 0 12 2.5v-1h1a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2" />
                                    </svg>
                                </div>
                            </Button>
                        </span>
                    </OverlayTrigger>
                </div>
            </div>
        )
    );
}

export default SequenceViewer;

/*
d-flex
    justify-content-start	
    justify-content-end	
    justify-content-center	
    justify-content-between	
    justify-content-around	
    justify-content-evenly
*/
