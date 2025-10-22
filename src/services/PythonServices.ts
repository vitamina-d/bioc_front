import { DOTNET_PYTHON_URL } from "../config/urls";
import type { Response } from "../types/Response";
import type { Sequence } from "../types/DataPython";

const GetComplement = async (
    sequence: string,
    reverse: boolean,
    complement: boolean
): Promise<Response<Sequence>> => {
    console.log("[PYTHON] POST /complement");

    const response = await fetch(`${DOTNET_PYTHON_URL}/complement`, {
        method: "POST",
        body: JSON.stringify({
            sequence: sequence,
            reverse: reverse,
            complement: complement,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const json = await response.json();
    console.log(response);
    console.log(json);
    return json;
};

const GetTranslate = async (
    sequence: string,
    frame: number
): Promise<Response<Sequence>> => {
    console.log("[PYTHON] POST /translate");

    const response = await fetch(`${DOTNET_PYTHON_URL}/translate`, {
        method: "POST",
        body: JSON.stringify({
            sequence: sequence,
            frame: frame,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const json = await response.json();
    console.log(response);
    console.log(json);
    return json;
};

export { GetComplement, GetTranslate };
