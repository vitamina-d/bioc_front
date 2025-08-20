import type { ResponseGetSequenceByRangePublic } from "../types/ResponseGetSequenceByRangePublic";
import type { ResponseGetSummaryPublic } from "../types/ResponseGetSummaryPublic";

const DOTNET_PUBLIC_URL: string = `https://localhost:32771/api/Public/`;
//const DOTNET_PUBLIC_URL: string = `https://localhost:32769/api/Public/`;

//https://localhost:32773/api/Public/ensembl?chrom=${chr}&start=${start}&end=${end}`;
const EnsemblService = async (
    chr: string,
    start: number,
    end: number
): Promise<ResponseGetSequenceByRangePublic> => {
    const url = `${DOTNET_PUBLIC_URL}ensembl?chrom=chr${chr}&start=${start}&end=${end}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
};

//https://localhost:32769/api/Public/summary?entrez=${entrez}&type=${gene}
const SummaryService = async (
    entrez: string,
    gene: string
): Promise<ResponseGetSummaryPublic> => {
    const url = `${DOTNET_PUBLIC_URL}summary?entrez=${entrez}&type=${gene}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
};

export { EnsemblService, SummaryService };
