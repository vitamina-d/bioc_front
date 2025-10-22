import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import { DOTNET_PUBLIC_URL } from "../config/urls";

const SummaryService = async (
    entrez: string
): Promise<ResponsePublicSummary> => {
    console.log("[PUBLIC] GET /summary/entrez");
    const url = `${DOTNET_PUBLIC_URL}/summary?entrez=${entrez}`;
    const response = await fetch(url);
    const json = await response.json();
    console.log(response);
    console.log(json);
    return json;
};

export { SummaryService };
