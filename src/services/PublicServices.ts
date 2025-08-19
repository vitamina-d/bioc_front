//https://localhost:32773/api/Public/ensembl?chrom=${chr}&start=${start}&end=${end}`;
//https://localhost:32769/api/Public/summary?entrez=${entrez}&type=${gene}

const DOTNET_PUBLIC_URL: string = `https://localhost:32773/api/Public/`;

const EnsemblService = async (
    chr: string,
    start: number,
    end: number
): Promise<string> => {
    const url = `${DOTNET_PUBLIC_URL}ensembl?chrom=${chr}&start=${start}&end=${end}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const SummaryService = async (
    entrez: number,
    gene: string
): Promise<string> => {
    const url = `${DOTNET_PUBLIC_URL}summary?entrez=${entrez}&type=${gene}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

export default {EnsemblService, SummaryService};
