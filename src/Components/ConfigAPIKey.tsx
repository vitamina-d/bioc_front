import {
    Button,
    Form,
    InputGroup,
    OverlayTrigger,
    Row,
    Tooltip,
} from "react-bootstrap";
import { useEffect, useState, type FormEvent } from "react";
import { useToastContext } from "../context/ToastContext";
import { Icon } from "./Icon";

type Props = {
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
};

function ConfigAPIKey({ setModalShow }: Props) {
    const { showToast } = useToastContext();
    const [APIkey, setAPIKey] = useState<string>("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        const key = localStorage.getItem("APIKey");
        if (key != null) {
            setAPIKey(key);
        }
        console.log(key)
    }, []);

    const saveAPIKey = (event: FormEvent) => {
        event.preventDefault();
        localStorage.setItem("APIKey", APIkey);
        showToast("La API Key ha sido guardada.", "Success", "primary");
        setModalShow(false);
    };
    const deleteAPIKey = (event: FormEvent) => {
        event.preventDefault();
        setAPIKey("");
        localStorage.removeItem("APIKey");
        showToast("La API Key ha sido eliminada.", "Success", "primary");
    };

    return (
        <Form>
            <Form.Group
                as={Row}
                className="mb-3 d-flex align-items-center"
                controlId="formPlaintextPassword"
            >
                <InputGroup className="mb-2">
                    <Form.Control
                        type={show ? "text" : "password"}
                        value={APIkey}
                        placeholder="Ingrese la API Key de Neurosnap"
                        onChange={(e) => setAPIKey(e.target.value)}
                    />
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setShow(!show)}
                        disabled={APIkey == ""}
                    >
                        <Icon type={show ? "eye" : "eyeSlash"} />
                    </Button>
                </InputGroup>
            </Form.Group>

            <Form.Text id="passwordHelpBlock" muted>
                La API key le permiten acceder a los endpoints de Neurosnap,
                debe mantenerse privada. Si alguien obtiene acceso a su API key
                tendrá acceso completo a su cuenta. Siempre puede solicitar una
                nueva en{" "}
                <a
                    href="https://neurosnap.ai/overview"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    neurosnap.ai/overview
                </a>
                .
            </Form.Text>

            <div className="d-flex justify-content-end gap-1 me-3">
                <OverlayTrigger overlay={<Tooltip>Save API Key</Tooltip>}>
                    <Button
                        className="d-flex justify-content-center align-items-center"
                        variant="outline-success"
                        onClick={saveAPIKey}
                    >
                        <Icon type={"check"} />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Delete API Key</Tooltip>}>
                    <Button
                        className="d-flex justify-content-center align-items-center"
                        variant="outline-danger"
                        onClick={deleteAPIKey}
                    >
                        <Icon type={"backspace"} />
                    </Button>
                </OverlayTrigger>
            </div>
        </Form>
    );
}

export default ConfigAPIKey;
