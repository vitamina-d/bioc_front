import { Badge, Button } from "react-bootstrap";

type Props = {
    text: string;
    value: string;
};

function ButtonBadge({ text, value }: Props) {
    return (
        <div className="d-inline-block">
            <Button className="align-items-center m-1" size="sm" variant="dark" style={{ fontSize: "0.7rem" }}>
                {text}
                <Badge bg="secondary" className="ms-2">
                    {value}
                </Badge>
            </Button>
        </div>
    );
}

export default ButtonBadge;
