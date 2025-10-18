import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

type Props = {
    setShowOffCanva: React.Dispatch<React.SetStateAction<boolean>>;
};

function Navigation({ setShowOffCanva }: Props) {
    return (
        <Navbar expand={false}>
            <Nav onClick={() => setShowOffCanva(false)}>
                <Nav.Link className="text-white" as={Link} to="/search">
                    Search
                </Nav.Link>
                <Nav.Link className="text-white" as={Link} to="/align">
                    Align
                </Nav.Link>
                <Nav.Link className="text-white" as={Link} to="/blastx">
                    Blastx
                </Nav.Link>
                <Nav.Link className="text-white" as={Link} to="/protein">
                    Protein
                </Nav.Link>
                <Nav.Link className="text-white" as={Link} to="/about">
                    About
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default Navigation;
