import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import type { DataDetail } from "../types/ResponsePlumber";
import NavSearcher from "./NavSearcher";

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
                    <Nav.Link as={Link} to="/range">
                        Range
                    </Nav.Link>
                    <Nav.Link as={Link} to="/complement">
                        Complement
                    </Nav.Link>
                    <Nav.Link as={Link} to="/align">
                        Align
                    </Nav.Link>
                    <Nav.Link as={Link} to="/upload">
                        Upload
                    </Nav.Link>
                    <Nav.Link as={Link} to="/protein">
                        Protein
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
