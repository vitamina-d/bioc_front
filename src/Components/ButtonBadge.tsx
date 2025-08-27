import { Badge, Button } from "react-bootstrap";

type Props = {
    text: string;
    value: string;
};

function ButtonBadge({ text, value }: Props) {
    return (
        <div className="d-inline-block">
            <Button className="align-items-center m-3" size="sm" variant="dark">
                {text}
                <Badge bg="secondary" className="ms-2">
                    {value}
                </Badge>
            </Button>
        </div>
    );
}

export default ButtonBadge;
