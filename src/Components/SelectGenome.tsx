import { type FormEventHandler } from "react";
import InputRange from "./InputRange";
import { Button, Form } from "react-bootstrap";
import DropdownChr from "./DropdownChr";

type Props = {
    submit: FormEventHandler;
    chr: string | null;
    setChr: React.Dispatch<React.SetStateAction<string | null>>;
    start: string;
    setStart: React.Dispatch<React.SetStateAction<string>>;
    end: string;
    setEnd: React.Dispatch<React.SetStateAction<string>>;
};

function SelectGenome({
    submit,
    chr,
    setChr,
    start,
    setStart,
    end,
    setEnd,
}: Props) {
    return (
        <Form onSubmit={submit}>
            <div className="row mx-1 ">
                <div className="col">
                    <DropdownChr chr={chr} setChr={setChr} />
                </div>

                <div className="col">
                    <InputRange number={start} setNumber={setStart}>
                        Desde
                    </InputRange>
                </div>
                <div className="col">
                    <InputRange number={end} setNumber={setEnd}>
                        Hasta
                    </InputRange>
                </div>
                <div className="col">
                    <Button variant="light" onClick={submit}>
                        Search
                    </Button>
                </div>
            </div>
        </Form>
    );
}

export default SelectGenome;
