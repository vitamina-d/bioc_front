const DOTNET_PLUMBER_URL: string = "https://localhost:32769/api/Plumber"; //api a R

//https://localhost:32769/api/Plumber/msg?msg=${msg}
const getMessage = async (msg: string): Promise<string> => {
    const response = await fetch(
        `${DOTNET_PLUMBER_URL}/msg?msg=${encodeURIComponent(msg)}`
    );
    const data = await response.json();
    return data;
};

//https://localhost:32769/api/Plumber/sequence_by_symbol?gene_symbol=${gene_symbol}&complete=${complete}
const GetSequenceBySymbol = async (
    gene_symbol: string,
    complete: boolean
): Promise<string> => {
    const response = await fetch(
        `${DOTNET_PLUMBER_URL}/sequence_by_symbol?gene_symbol=${gene_symbol}&complete=${complete}`
    );
    const data = await response.json();
    return data;
};

//https://localhost:32769/api/Plumber/percent?sequence=${sequence}
const GetPercent = async (sequence: string): Promise<string> => {
    const response = await fetch(
        `${DOTNET_PLUMBER_URL}/percent?sequence=${sequence}`
    );
    const data = await response.json();
    return data;
};

//https://localhost:32769/api/Plumber/detail?gene_symbol=${gene_symbol}
const GetDetail = async (gene_symbol: string): Promise<string> => {
    const response = await fetch(
        `${DOTNET_PLUMBER_URL}/detail?gene_symbol=${gene_symbol}`
    );
    const data = await response.json();
    return data;
};

//https://localhost:32769/api/Plumber/sequence_by_range?chrom=${}&start=${}&end=${}
const GetSequenceByRange = async ( 
    chr: string,
    start: number,
    end: number
): Promise<string> => {
    const response = await fetch(
        `${DOTNET_PLUMBER_URL}/sequence_by_range?chrom=${chr}&start=${start}&end=${end}`
    );
    const data = await response.json();
    return data;
};

//https://localhost:32769/api/Plumber/align?pattern=${}&subject=${}&global=${}
const GetAlign = async ( 
    pattern: string,
    subject: string,
    global: boolean
): Promise<string> => {
    const response = await fetch(
        `${DOTNET_PLUMBER_URL}/align?pattern=${pattern}&subject=${subject}&global=${global}`
    );
    const data = await response.json();
    return data;
};

export default {
    getMessage,
    GetSequenceBySymbol,
    GetPercent,
    GetDetail,
    GetSequenceByRange,
    GetAlign,
};
