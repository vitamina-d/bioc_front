import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import { DOTNET_PUBLIC_URL } from "../config/urls";

//https://localhost:32769/api/Public/summary?entrez=${entrez}&type=${gene}
const SummaryService = async (
    entrez: string
): Promise<ResponsePublicSummary> => {
    const url = `${DOTNET_PUBLIC_URL}/summary?entrez=${entrez}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
};

export { SummaryService };
