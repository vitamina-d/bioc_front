import { Card } from "react-bootstrap";
import Header from "../Components/Header";

function AboutView() {
    return (
        <Card className="p-3 my-3">
            <Header
                title="v i t a m i n a"
                text="Tema: Aplicación web para el análisis de datos genómicos relacionados con la Vitamina D, su estudio y caracterización."
                imageSrc="../../public/gene.png"
            />
        </Card>
    );
}

export default AboutView;
