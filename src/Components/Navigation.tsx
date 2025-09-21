import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import NavSearcher from "./NavSearcher";
import type { DataDetail } from "../types/DataPlumber";

type Props = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setDetail: React.Dispatch<React.SetStateAction<DataDetail | null>>;
};

function Navigation({ search, setSearch, setDetail }: Props) {
    return (
        <Navbar expand="lg" bg="light" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/home">
                    <img
                        src={"../../public/gene.png"}
                        width="30"
                        height="30"
                        className="d-inline-block mx-3"
                        alt="Logo"
                    />
                    v i t a m i n a
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/home">
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/search">
                        Search
                    </Nav.Link>
                    <Nav.Link as={Link} to="/align">
                        Align
                    </Nav.Link>
                    <Nav.Link as={Link} to="/blastx">
                        Blastx
                    </Nav.Link>
                    <Nav.Link as={Link} to="/about">
                        About
                    </Nav.Link>
                </Nav>
                <NavSearcher
                    search={search}
                    setSearch={setSearch}
                    setDetail={setDetail}
                />
            </Container>
        </Navbar>
    );
}

export default Navigation;
