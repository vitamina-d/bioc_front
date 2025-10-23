import { useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import type { Response } from "../types/Response";
import { GetAutocomplete, getEntrez } from "../services/BioconductorServices";
import { useNavigate } from "react-router-dom";
import { Icon } from "./Icon";
import type { DataEntrez } from "../types/DataPlumber";

type Props = {
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
};

function SearchDetail({ setModalShow }: Props) {
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>("");
    const [desplegable, setDesplegable] = useState<string[]>([]);

    //click en Searcher DETAIL BREVE - submit
    const getEntrezByValue = async (e: React.FormEvent) => {
        e.preventDefault();
        setModalShow(false);
        const getEntrezByValue: Response<DataEntrez> = await getEntrez(search);
        const entrez = getEntrezByValue.data?.entrez;

        if (entrez) {
            navigate(`/detail/${entrez}`);
        } else {
            navigate("/404");
        }
    };

    //AUTOCOMPLETE
    const autocomplete = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.target.value);
        if (search.trimStart().length > 0 && search.trimEnd().length > 0) {
            const alias: Response<string[]> = await GetAutocomplete(search);
            setDesplegable(alias.data);
        }
    };

    return (
        <>
            <Form onSubmit={getEntrezByValue} className="mb-10">
                <div className="input-group w-auto">
                    <input
                        type="text"
                        className="form-control text-muted text-small"
                        id="inputSymbol"
                        value={search}
                        onChange={autocomplete}
                        placeholder="Ingrese alias"
                    />

                    <Button variant="secondary" type="submit">
                        <Icon type={"search"} />
                    </Button>
                </div>
            </Form>
            {
                ////DESPLEGABLE//////////////////////////////////////////
                desplegable && (
                    <Dropdown
                        className="position-static"
                        style={{
                            top: "100%",
                            zIndex: 10000000
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
        </>
    );
}

export default SearchDetail;
