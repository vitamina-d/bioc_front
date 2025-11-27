import { CardImg, Col, Container, Row } from "react-bootstrap";
import img from "../assets/logo.png";

type Props = {
    title?: string;
};

function Footer({}: Props) {
    return (
        <footer className="bg-dark py-3 border-top fixed-bottom">
            <Container>
                <Row className="align-items-center text-center ">
                    <Col>
                        <CardImg
                            src={img}
                            alt="icono"
                            style={{
                                width: "30px",
                                height: "30px",
                                objectFit: "cover",
                            }}
                            className="me-2 rounded-circle"
                        />
                        <span className="text-light font-monospace small">UNAJ 2025</span>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
