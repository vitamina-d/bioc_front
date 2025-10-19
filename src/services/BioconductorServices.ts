import { DOTNET_BIOCONDUCTOR_URL } from "../config/urls";
import type { ResponsePlumber } from "../types/ResponsePlumber";
import type {
    DataAlign,
    DataComplement,
    DataDetail,
    DataEntrez,
    DataFullDetail,
    DataPercent,
    DataSequence,
    DataStats,
} from "../types/DataPlumber";
//https://localhost:32769/api/Plumber/align
const GetAlign = async (
    pattern: string,
    subject: string,
    type: string, //#* @param type "global", "local", "overlap"
    gapOpening: number, // >=0
    gapExtension: number // >=0
): Promise<ResponsePlumber<DataAlign>> => {
    const response = await fetch(`${DOTNET_BIOCONDUCTOR_URL}/align`, {
        method: "POST",
        body: JSON.stringify({
            pattern: pattern,
            subject: subject,
            type: type,
            gapOpening: gapOpening,
            gapExtension: gapExtension,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(response);
    const data = await response.json();
    return data;
};

const GetAutocomplete = async (
    value: string
): Promise<ResponsePlumber<string[]>> => {
    const response = await fetch(
        `${DOTNET_BIOCONDUCTOR_URL}/autocomplete?input=${value}`
    );
    const data = await response.json();
    return data;
};

//https://localhost:32789/api/Plumber/detail?value=slos&full=false
const GetDetail = async (
    value: string
): Promise<ResponsePlumber<DataDetail>> => {
    const full = false;
    const response = await fetch(
        `${DOTNET_BIOCONDUCTOR_URL}/detail?value=${value}&full=${full}`
    );
    const data = await response.json();
    return data;
};
const GetFullDetail = async (
    value: string
): Promise<ResponsePlumber<DataFullDetail>> => {
    const full = true;
    const response = await fetch(
        `${DOTNET_BIOCONDUCTOR_URL}/detail?value=${value}&full=${full}`
    );
    const data = await response.json();
    return data;
};

//https://localhost:32789/api/Plumber/percent
const GetPercent = async (
    sequence: string
): Promise<ResponsePlumber<DataPercent>> => {
    const response = await fetch(`${DOTNET_BIOCONDUCTOR_URL}/percent`, {
        method: "POST",
        body: JSON.stringify(sequence),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
};

//https://localhost:32789/api/Plumber/sequence?value=slos&complete=true
const GetSequence = async (
    value: string,
    complete: boolean
): Promise<ResponsePlumber<DataSequence>> => {
    const response = await fetch(
        `${DOTNET_BIOCONDUCTOR_URL}/sequence?value=${value}&complete=${complete}`
    );
    const data = await response.json();
    return data;
};

//https://localhost:32789/api/Plumber/sequence?value=slos&complete=true
const GetStats = async (
    entrez: string,
    complete: boolean
): Promise<ResponsePlumber<DataStats>> => {
    const response = await fetch(
        `${DOTNET_BIOCONDUCTOR_URL}/stats?entrez=${entrez}&complete=${complete}`
    );
    const data = await response.json();
    return data;
};

//https://localhost:32789/api/Plumber/sequence_by_range?chrom=11&start=100&end=200
const GetSequenceByRange = async (
    chr: string, //11, X, Y
    start: number,
    end: number
): Promise<ResponsePlumber<DataSequence>> => {
    const response = await fetch(
        `${DOTNET_BIOCONDUCTOR_URL}/sequence_by_range?chrom=${chr}&start=${start}&end=${end}`
    );
    const data = await response.json();
    console.log(response);
    console.log(data);
    return data;
};

//https://localhost:32769/api/Plumber/msg?msg=${msg}
const getMessage = async (msg: string): Promise<string> => {
    const response = await fetch(
        `${DOTNET_BIOCONDUCTOR_URL}/msg?msg=${encodeURIComponent(msg)}`
    );
    const data = await response.json();
    return data;
};

const getEntrez = async (value: string): Promise<ResponsePlumber<DataEntrez>> => {
    console.log(value)
    const response = await fetch(
        `${DOTNET_BIOCONDUCTOR_URL}/entrez/${value}`
    );
    console.log(response)
    const data = await response.json();
    console.log(data)
    return data;
};

export {
    GetAlign,
    GetAutocomplete,
    GetDetail,
    GetFullDetail,
    GetPercent,
    GetSequence,
    GetStats,
    GetSequenceByRange,
    getMessage,
    getEntrez
};
