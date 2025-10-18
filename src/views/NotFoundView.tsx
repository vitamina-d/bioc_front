import { Button, Card, CardImg, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NotFoundView() {
    const navigate = useNavigate();

    return (
        <Container fluid className="mt-3">
            <Card className="justify-content-center align-items-center p-3">
                <CardImg
                    src="../../public/search-gene.png"
                    alt="icono"
                    className="me-2 rounded-circle"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <Card.Title className="font-monospace mb-1">n o t f o u n d</Card.Title>
            <Button variant="secondary" className="mt-3" onClick={() => navigate("/")}> Back</Button>
            </Card>  
        </Container>
    );
}

export default NotFoundView;
