import { Container } from "react-bootstrap";
import Header from "../Components/Header";
import img from "../assets/gene.png";

function AboutView() {
    return (
        <Container fluid className="mt-3">
            <Header
                title="v i t a m i n a"
                text="Tema: Aplicación web para el análisis de datos genómicos relacionados con la Vitamina D, su estudio y caracterización."
                imageSrc={img}
            />
        </Container>
    );
}

export default AboutView;
