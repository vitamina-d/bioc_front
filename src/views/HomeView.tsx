import { Card, CardImg, Container } from "react-bootstrap";
import img from "../assets/gene.png"

function HomeView() {

    return (
        <Container fluid className="mt-3">
            <Card className="justify-content-center align-items-center p-3">
                <CardImg
                    src={img}
                    alt="icono"
                    className="me-2 rounded-circle"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <Card.Title className="font-monospace mb-1">v i t a m i n a</Card.Title>
            </Card>  
        </Container>
    );
}

export default HomeView;
