import { DOTNET_PYTHON_URL } from "../config/urls";
import type { ResponsePlumber } from "../types/ResponsePlumber";
import type { Sequence } from "../types/DataPython";

//https://localhost:32769/api/Python/complement
const GetComplement = async (
    sequence: string,
    reverse: boolean,
    complement: boolean
): Promise<ResponsePlumber<Sequence>> => {
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
    console.log(response);
    const data = await response.json();
    return data;
};

const GetTranslate = async (
    sequence: string,
    frame: number
): Promise<ResponsePlumber<Sequence>> => {
    const response = await fetch(`${DOTNET_PYTHON_URL}/translate`, {
        method: "POST",
        body: JSON.stringify({
            sequence: sequence,
            frame: frame
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(response);
    const data = await response.json();
    return data;
};
export {
    //GetAlign,
    GetComplement,
    GetTranslate
};
