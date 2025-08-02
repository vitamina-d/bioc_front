import { useState, type FormEvent } from "react";
import Dropdown from "./Dropdown";
import Range from "./Range";

function SelectGenome() {
    const [start, setStart] = useState("00000");
    const [end, setEnd] = useState("00000");
    const [chr, setChr] = useState("");

    //funcion para una propiedad de evento
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        console.log("chr:", chr, "start: ", start, "y end: ", end);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="p-3">
                <div className="d-flex gap-3 align-items-end ">
                    <Dropdown setChr={setChr} />
                    <Range setStart={setStart} setEnd={setEnd} />
                    <button type="submit" className="btn btn-primary">Consultar</button>
                    
                </div>
            </form>
        </>
    );
}

export default SelectGenome;
