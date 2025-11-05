import { DOTNET_PYTHON_URL } from "../config/urls";
import type { Response } from "../types/Response";
import type { Sequence } from "../types/DataPython";
import type { Toast } from "../context/ToastContext";

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

const GetCompare = async (
    pdb_file: File,
    reference_id: string,
    showToast: (
        message: string,
        status: Toast["status"],
        type?: Toast["type"]
    ) => void
): Promise<string | null> => {
    console.log("[PYTHON] POST /compare");
    const form = new FormData();
    form.append("pdb_file", pdb_file);

    try {
        const response = await fetch(
            `${DOTNET_PYTHON_URL}/compare/${reference_id}`,
            {
                method: "POST",
                body: form,
            }
        );

        if (!response.ok) {
            showToast(
                `Error ${response.status}: ${response.statusText}`,
                "Warning",
                "danger"
            );
            return null;
        }

        const pdbFile: string = await response.text();
        console.log(response);
        console.log(pdbFile);
        showToast("Comparación exitosa", "Success", "primary");
        return pdbFile;
    } catch {
        showToast("No se pudo conectar al servidor", "Error", "danger");
        return null;
    }
};

export { GetComplement, GetTranslate, GetCompare };
