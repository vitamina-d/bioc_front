import { useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import type { Response } from "../types/Response";
import { GetAutocomplete, getEntrez } from "../services/PlumberServices";
import { useNavigate } from "react-router-dom";
import { Icon } from "./Icon";
import type { DataEntrez } from "../types/DataPlumber";
import { useToastContext } from "../context/ToastContext";
import { useSpinnerContext } from "../context/SpinnerContext";

type Props = {
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
};

function SearchDetail({ setModalShow }: Props) {
    const { showToast } = useToastContext();
    const { showSpinner, hideSpinner } = useSpinnerContext();

    const navigate = useNavigate();
    const [search, setSearch] = useState<string>("");
    const [desplegable, setDesplegable] = useState<string[] | null>([]);

    //click en Searcher DETAIL BREVE - submit
    const getEntrezByValue = async (e: React.FormEvent) => {
        e.preventDefault();
        if (search == "") {
            showToast("Ingrese un value. ", "Warning", "warning");
            return;
        }
        showSpinner();

        setModalShow(false);

        const getEntrezByValue: Response<DataEntrez> | null = await getEntrez(
            search,
            showToast
        );

        if (
            !getEntrezByValue ||
            !getEntrezByValue.data ||
            !getEntrezByValue.data.entrez
        ) {
            hideSpinner();
            showToast("Ingrese un alias válido.", "Warning", "warning");
            return;
        }

        hideSpinner();
        navigate(`/detail/${getEntrezByValue.data.entrez}`);
    };

    //AUTOCOMPLETE
    const autocomplete = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = e.target.value;
        setSearch(value);
        if (e.target.value.trim().length > 0) {
            const alias: Response<string[]> | null = await GetAutocomplete(
                value
            );
            setDesplegable(alias?.data ?? null);
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
                            zIndex: 10000000,
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
                            ))}
                        </div>
                    </Dropdown>
                )
            }
        </>
    );
}

export default SearchDetail;
