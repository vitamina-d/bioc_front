import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import type { Response } from "../types/Response";
import { DOTNET_PUBLIC_URL } from "../config/urls";

const SummaryService = async (
    entrez: string
): Promise<Response<ResponsePublicSummary>> => {
    console.log("[PUBLIC] GET /summary/entrez");
    const url = `${DOTNET_PUBLIC_URL}/summary?entrez=${entrez}`;
    const response = await fetch(url);
    const result = await response.json();
    console.log(response);
    console.log(result);
    return {
        code: response.status,
        message: response.statusText,
        data: result,
    };
};

export { SummaryService };
