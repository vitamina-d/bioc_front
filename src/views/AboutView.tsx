import { Button, Container } from "react-bootstrap";
import Header from "../Components/Header";
import { GetEstructureAlign } from "../services/FoldingServices";

function AboutView() {
    const getEstructure = async () => {
        try {
            const response = await GetEstructureAlign("4quv", "68e17d82e986d44f8b7e9e1b", "3");
            console.log(response);
        } catch {
            console.log("no se descargo el job alineado");
        }
    };

    return (
        <Container fluid className="mt-3">
            <Header
                title="v i t a m i n a"
                text="Tema: Aplicación web para el análisis de datos genómicos relacionados con la Vitamina D, su estudio y caracterización."
                imageSrc="../../public/gene.png"
            />
            <Button onClick={getEstructure}>get</Button>
            <p>mostrar estructura alineada con pdbid</p>
        </Container>
    );
}

export default AboutView;
