import {
    Card,
    CardImg,
    Col,
    Container,
    Row,
} from "react-bootstrap";
import img from "../assets/gene.png";

function HomeView() {
    return (
        <Container fluid className="mt-3 pb-5">
            <Row className="border-0">
                <Col xs={12}>
                    <Card className="justify-content-center align-items-center p-5">
                        <CardImg
                            src={img}
                            alt="icono"
                            className="me-2 rounded-circle"
                            style={{
                                width: "200px",
                                height: "200px",
                                objectFit: "cover",
                            }}
                        />
                        <Card.Title className="font-monospace mb-1">
                            v i t a m i n a
                        </Card.Title>
                    </Card>
                </Col>
            </Row>
{/*            <Row>
                <Carousel>
                    <CarouselItem>
                        <Card className="mt-3 justify-content-center align-items-center pb-3">
                            <ProteinView />
                        </Card>
                    </CarouselItem>{" "}
                    <CarouselItem>
                        <Row>
                            <Col xs={6}>
                                <Card className="mt-3 justify-content-center align-items-center pb-3">
                                    <AlignView />
                                </Card>{" "}
                            </Col>
                            <Col xs={6}>
                                <Card className="mt-3 justify-content-center align-items-center pb-3">
                                    <SearchView />{" "}
                                </Card>
                            </Col>
                        </Row>
                    </CarouselItem>
                </Carousel>
            </Row>
*/}        </Container>
    );
}

export default HomeView;
