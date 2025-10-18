import Offcanvas from "react-bootstrap/Offcanvas";
import Navigation from "./Navigation";
import { Button } from "react-bootstrap";
import { Icon } from "./Icon";

type Props = {
    showOffCanva: boolean;
    setShowOffCanva: React.Dispatch<React.SetStateAction<boolean>>;
};

function OffCanvasComponent({ showOffCanva, setShowOffCanva }: Props) {
    return (
        <>
            <Offcanvas
                show={showOffCanva}
                onHide={() => setShowOffCanva(false)}
                className="bg-dark text-white"
                
            >
                <Offcanvas.Header>
                    <Offcanvas.Title className="font-monospace">
                        <Button
                            variant="light"
                            className="bg-light"
                            onClick={() => setShowOffCanva(false)}
                        >
                            <Icon type={"burger"} />
                        </Button>
                        <img
                            src={"../../public/gene.png"}
                            width="30"
                            height="30"
                            className="d-inline-block mx-3"
                            alt="Logo"
                        />
                        v i t a m i n a
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* LISTA */}
                    <Navigation setShowOffCanva={setShowOffCanva} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OffCanvasComponent;
