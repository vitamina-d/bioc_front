import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import type { Response } from "../types/Response";
import { DOTNET_PUBLIC_URL } from "../config/urls";
import type { ShowToast } from "../context/ToastContext";
import apiRequest from "../wrapper/apiRequest";

const SummaryService = async (
    entrez: string,
    showToast: ShowToast
): Promise<Response<ResponsePublicSummary> | null> => {
    console.log("[PUBLIC] GET /summary/entrez");
    const url = `${DOTNET_PUBLIC_URL}/summary?entrez=${entrez}`;
    const options: RequestInit = {
        method: "GET",
    };
    const json = await apiRequest<Response<ResponsePublicSummary>>(
        url,
        options,
        showToast
    );
    console.log(json);
    if (json?.data == null) {
        showToast("No se encontro el entrez", "Warning", "warning");
        return null;
    }

    return json;
};

export { SummaryService };
