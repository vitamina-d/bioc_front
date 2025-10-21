import {
    Card,
    CardImg,
    Carousel,
    CarouselItem,
    Col,
    Container,
    Row,
} from "react-bootstrap";
import img from "../assets/gene.png";
import SearchView from "./SearchView";
import ProteinView from "./ProteinView";
import AlignView from "./AlignView";
import ProteinViewer from "../Components/ProteinViewer";

function HomeView() {
    return (
        <Container fluid className="mt-3">
            <Row className="border-0">
                <Col xs={12}>
                    <Card className="justify-content-center align-items-center p-3">
                        <CardImg
                            src={img}
                            alt="icono"
                            className="me-2 rounded-circle"
                            style={{
                                width: "150px",
                                height: "150px",
                                objectFit: "cover",
                            }}
                        />
                        <Card.Title className="font-monospace mb-1">
                            v i t a m i n a
                        </Card.Title>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Carousel>
                    <CarouselItem>
                        <Card className="mt-3 justify-content-center align-items-center pb-3">
                            <ProteinViewer size="sm" pdbId={"4Q0G"} />
                        </Card>
                    </CarouselItem>
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
        </Container>
    );
}

export default HomeView;
