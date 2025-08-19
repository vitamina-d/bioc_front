import { Card } from "react-bootstrap";
import Header from "../Components/Header";

function Home() {
    return (
        <Card className="p-3 my-3">
            <Header
                title="v i t a m i n a"
                text="Tema: Aplicación web para el análisis de datos genómicos relacionados con la Vitamina D, su estudio y caracterización."
                imageSrc="../../public/gene.png"
            />

            <div
                style={{height: "400px", width: "400px", position: "relative"}}
                className="viewer_3Dmoljs"
                data-pdb="2POR"
                data-backgroundcolor="0xffffff"
                data-style="stick"
                data-ui="true"
            ></div>
        </Card>
    );
}

export default Home;
