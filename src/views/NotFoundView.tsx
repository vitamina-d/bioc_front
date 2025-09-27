import { Button } from "react-bootstrap";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";

function NotFoundView() {
    const navigate = useNavigate();

    return (
        <div className="row mx-1 ">
            <Header
                title="notfound"
                text="text."
                imageSrc="../../public/gene.png"
            />
            <Button onClick={() => navigate("search")}> Back</Button>
        </div>
    );
}

export default NotFoundView;
