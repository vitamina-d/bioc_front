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
                <Card.Title className="font-monospace mt-3 mb-1">404</Card.Title>
                <Card.Text className="font-monospace mb-3">n o t f o u n d</Card.Text>
            <Button variant="secondary" onClick={() => navigate("/")}> Back</Button>
            </Card>  
        </Container>
    );
}

export default NotFoundView;
