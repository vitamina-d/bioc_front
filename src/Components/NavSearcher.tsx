import { useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import type {
    ResponsePlumber,
} from "../types/ResponsePlumber";
import { GetAutocomplete, GetDetail } from "../services/BioconductorServices";
import { useNavigate } from "react-router-dom";
import type { DataDetail } from "../types/DataPlumber";

type Props = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setDetail: React.Dispatch<React.SetStateAction<DataDetail | null>>;
};

function NavSearcher({ search, setSearch, setDetail }: Props) {
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

    //click en Searcher DETAIL BREVE
    const searchDetail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDetail(null);
        console.log("SEARCH: ", search);

        try {
            const response: ResponsePlumber<DataDetail> = await GetDetail(
                search
            );
            setDetail(response.data);
            if (response.code == 200) {
                navigate("/home");
            }
        } catch (err) {
            console.error(err);
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
                        <svg width="16" height="16" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </Button>
                </label>
            </div>
        </Form>
    );
}

export default NavSearcher;
