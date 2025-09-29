import { Button, Container } from "react-bootstrap";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";

function NotFoundView() {
    const navigate = useNavigate();

    return (
        <Container fluid className="mt-3">
            <Header
                title="notfound"
                text="text."
                imageSrc="../../public/gene.png"
            />
            <Button onClick={() => navigate("search")}> Back</Button>
        </Container>
    );
}

export default NotFoundView;
