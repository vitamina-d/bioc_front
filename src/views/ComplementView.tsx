import { Card } from "react-bootstrap";
import Header from "../Components/Header";

function AboutView() {
    return (
        <>
            <Card className="p-3 my-3">
                <Header
                    title="Complemento"
                    text="reverse - complement"
                    imageSrc="../../public/gene.png"
                />
            </Card>
        </>
    );
}

export default AboutView;
