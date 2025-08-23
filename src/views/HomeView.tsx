import { Card } from "react-bootstrap";
import Header from "../Components/Header";

function HomeView() {
    return (
        <Card className="p-3 my-3">
            <Header
                title="Home"
                text="subtitle."
                imageSrc="../../public/gene.png"
            />
        </Card>
    );
}

export default HomeView;
