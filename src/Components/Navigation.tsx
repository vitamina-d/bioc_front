import { useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Navigation() {
    const [input, setInput] = useState<string>("idle");

    return (
        <Navbar expand="lg" bg="light">
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
                    <Nav.Link as={Link} to="/detail">
                        Detail
                    </Nav.Link>
                    <Nav.Link as={Link} to="/search">
                        Search
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

                <div className="input-group w-auto">
                    <label className="input-group-text">input</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputSymbol"
                        placeholder={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        variant="light"                        
                        onClick={() => alert(input)}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </Button>
                </div>
            </Container>
        </Navbar>
    );
}

export default Navigation;
