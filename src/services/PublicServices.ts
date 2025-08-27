import type { ResponsePublicRange } from "../types/ResponsePublicRange";
import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import { DOTNET_PUBLIC_URL } from "../config/constant";

//https://localhost:32773/api/Public/ensembl?chrom=${chr}&start=${start}&end=${end}`;
const EnsemblService = async (
    chr: string,
    start: number,
    end: number
): Promise<ResponsePublicRange> => {
    const url = `${DOTNET_PUBLIC_URL}ensembl?chrom=chr${chr}&start=${start}&end=${end}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
};

//https://localhost:32769/api/Public/summary?entrez=${entrez}&type=${gene}
const SummaryService = async (
    entrez: string
): Promise<ResponsePublicSummary> => {
    const url = `${DOTNET_PUBLIC_URL}summary?entrez=${entrez}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
};

export { EnsemblService, SummaryService };
