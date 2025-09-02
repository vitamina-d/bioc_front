import { Button, Dropdown, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import type { DataDetail, ResponsePlumber } from "../types/ResponsePlumber";
import { GetAutocomplete, GetDetail } from "../services/PlumberServices";
import { useState } from "react";

type Props = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setDetail: React.Dispatch<React.SetStateAction<DataDetail | null>>;
};

function Navigation({ search, setSearch, setDetail }: Props) {
    const navigate = useNavigate();
    const [desplegable, setDesplegable] = useState<string[]>([]);

    //click en Searcher DETAIL BREVE
    const searchDetail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDetail(null);
        console.log("SEARCH: ", search);

        try {
            const plumberRes: ResponsePlumber<DataDetail> = await GetDetail(
                search
            );
            setDetail(plumberRes.data);
            if (plumberRes.code == 200) {
                navigate("/search");
            }
        } catch (err) {
            console.error(err);
        }
    };

    //AUTOCOMPLETE
    const autocomplete = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.target.value);
        console.log("AUTOCOMPLETE: ", search);
        if (search.trimStart().length > 0 && search.trimEnd().length > 0) {
            const alias: ResponsePlumber<string[]> = await GetAutocomplete(
                search
            );
            console.log(
                "SEARCH: ",
                search,
                " --> AUTOCOMPLETE RESPONSE DATA: ",
                alias.data
            );
            setDesplegable(alias.data);
        }
    };

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
                <Form onSubmit={searchDetail}>
                    <div className="input-group w-auto">
                        <input
                            type="text"
                            className="form-control font-monospace text-muted text-small"
                            id="inputSymbol"
                            value={search}
                            onChange={autocomplete}
                            placeholder="alias . . ."
                        />

                        {
                            ////DESPLEGABLE//////////////////////////////////////////
                            desplegable.length > 0 && search && (
                                <Dropdown
                                    className="position-absolute "
                                    style={{
                                        top: "100%",
                                    }}
                                >
                                    <div
                                        className="bg-white border rounded shadow-sm font-monospace text-muted text-small"
                                        style={{
                                            maxHeight: "200px",
                                            overflowY: "auto",
                                        }}
                                    >
                                        {desplegable.map((elem, i) => (
                                            <Dropdown.Item
                                                key={i}
                                                onClick={() => {
                                                    setSearch(elem);
                                                    setDesplegable([]);
                                                }}
                                            >
                                                {elem}
                                            </Dropdown.Item>
                                        ))}{" "}
                                    </div>
                                </Dropdown>
                            )
                        }

                        <label className="input-group-text p-0">
                            <Button
                                variant="light"
                                className="bg-light"
                                type="submit"
                                disabled={search == ""}
                                //onClick={() => alert(search)}
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg>
                            </Button>
                        </label>
                    </div>
                </Form>
            </Container>
        </Navbar>
    );
}

export default Navigation;
