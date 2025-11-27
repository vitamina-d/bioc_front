import { DOTNET_BLAST_URL } from "../config/urls";
import type { ShowToast } from "../context/ToastContext";
import type { BlastxReport } from "../types/DataBlastx";
import type { Response } from "../types/Response";
import apiRequest from "../wrapper/apiRequest";

const PostBlastx = async (
    sequence: string,
    showToast: ShowToast
): Promise<Response<BlastxReport> | null> => {
    console.log("[BLAST] POST /blastx");
    const url = `${DOTNET_BLAST_URL}/blastx`;
    const options = {
        method: "POST",
        body: JSON.stringify({
            sequence: sequence,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    };

    const json = await apiRequest<Response<BlastxReport>>(
        showToast,
        url,
        options
    );

    if (json?.data.results.search.hits.length == 0) {
        showToast("No se encontraron matches", "Success", "primary");
        return null;
    }

    return json;
};

export { PostBlastx };
