import { Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type Props = {
    name: string;
};

function BadgeProtein({ name }: Props) {
    const navigate = useNavigate();
    const onClick = () => {
        console.log("badge protein envia --------------", name)
        navigate("/protein", { state: { id: name } });
    };

    return (
        <Badge
            key={name}
            className="ms-1"
            bg="dark"
            style={{ cursor: "pointer" }}
            onClick={onClick}
        >
            {name}
        </Badge>
    );
}

export default BadgeProtein;
