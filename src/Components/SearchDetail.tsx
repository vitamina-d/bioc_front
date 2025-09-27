import { useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import type { ResponsePlumber } from "../types/ResponsePlumber";
import { GetAutocomplete, GetDetail } from "../services/BioconductorServices";
import { useNavigate } from "react-router-dom";
import type { DataDetail } from "../types/DataPlumber";
import { Icon } from "./Icon";

type Props = {
    setDetail: React.Dispatch<React.SetStateAction<DataDetail | null>>;
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
};

function SearchDetail({ setDetail, setModalShow }: Props) {
    const [search, setSearch] = useState<string>("");

    const [desplegable, setDesplegable] = useState<string[]>([]);
    const navigate = useNavigate();

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

    //click en Searcher DETAIL BREVE - submit
    const searchDetail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setModalShow(false);
        setDetail(null);
        console.log("SEARCH: ", search);

        try {
            const response: ResponsePlumber<DataDetail> = await GetDetail(
                search
            );
            setDetail(response.data);
            if (response.code == 200) {
                navigate("/detail");
            }
        } catch {
            navigate("notfound");
        }
    };
    return (
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
                    >
                        <Icon type={"search"} />
                    </Button>
                </label>
            </div>
        </Form>
    );
}

export default SearchDetail;
