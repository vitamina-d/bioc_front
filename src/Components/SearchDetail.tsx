import { useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import type { ResponsePlumber } from "../types/ResponsePlumber";
import { GetAutocomplete, getEntrez } from "../services/BioconductorServices";
import { useNavigate } from "react-router-dom";
import { Icon } from "./Icon";
import type { DataEntrez } from "../types/DataPlumber";

type Props = {
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
};

function SearchDetail({setModalShow}:Props ) {
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>("");
    const [desplegable, setDesplegable] = useState<string[]>([]);

    //click en Searcher DETAIL BREVE - submit
    const getEntrezByValue = async (e: React.FormEvent ) => {
        e.preventDefault();
        setModalShow(false);
        console.log("el input es: ", search);
        const getEntrezByValue: ResponsePlumber<DataEntrez> = await getEntrez(
            search
        );
        console.log("el response es: ", getEntrezByValue);
        //getentrez
        const entrez = getEntrezByValue.data?.entrez;
        console.log("el entrez es: ", entrez);
        
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
        console.log("AUTOCOMPLETE: ", search);
        if (search.trimStart().length > 0 && search.trimEnd().length > 0) {
            const alias: ResponsePlumber<string[]> = await GetAutocomplete(
                search
            );
            setDesplegable(alias.data);
        }
    };

    return (
        <>
            <Form onSubmit={getEntrezByValue}>
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
            {////DESPLEGABLE//////////////////////////////////////////
                desplegable && (
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
        </>
    );
}

export default SearchDetail;
