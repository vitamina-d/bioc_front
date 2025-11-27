import { Badge } from "react-bootstrap";

type Props = {
    name: string;
};

function BadgeProtein({ name }: Props) {

    return (
        <Badge
            key={name}
            className="ms-1"
            bg="dark"
            style={{ cursor: "pointer" }}
        >
            {name}
        </Badge>
    );
}

export default BadgeProtein;
