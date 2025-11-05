import { DOTNET_BLAST_URL } from "../config/urls";
import type { Toast } from "../context/ToastContext";
import type { BlastxReport } from "../types/DataBlastx";
import type { Response } from "../types/Response";

const PostBlastx = async (
    sequence: string,
    showToast: (
        message: string,
        status: Toast["status"],
        type?: Toast["type"]
    ) => void
): Promise<Response<BlastxReport> | null> => {
    console.log("[BLAST] POST /blastx");

    try {
        const response = await fetch(`${DOTNET_BLAST_URL}/blastx`, {
            method: "POST",
            body: JSON.stringify({
                sequence: sequence,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (!response.ok) {
            showToast(
                `Error ${response.status}: ${response.statusText}`,
                "Warning",
                "danger"
            );
            return null;
        } 

        const json = await response.json();
        console.log(response);
        console.log(json);
        if (json.data.results.search.hits.length == 0){
            showToast("No se encontraron matches", "Success", "primary");
        }
        //showToast("Comparación exitosa", "Success", "primary");
        return json;
    } catch {
        showToast("No se pudo conectar al servidor", "Error", "danger");
        return null;
    }
};

export { PostBlastx };
