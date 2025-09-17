import { DOTNET_BIOCONDUCTOR_URL } from "../config/constant";
import type {
    DataAlign,
    DataComplement,
    DataDetail,
    DataFullDetail,
    DataPercent,
    DataSequence,
    DataStats,
    ResponseBioconductor,
} from "../types/ResponseBioconductor";

//https://localhost:32769/api/Plumber/align
const GetAlign = async (
    pattern: string,
    subject: string,
    type: string, //#* @param type "global", "local", "overlap"
    gapOpening: number, // >=0
    gapExtension: number // >=0
): Promise<ResponseBioconductor<DataAlign>> => {
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
): Promise<ResponseBioconductor<string[]>> => {
    const response = await fetch(
        `${DOTNET_BIOCONDUCTOR_URL}/autocomplete?input=${value}`
    );
    const data = await response.json();
    return data;
};
//https://localhost:32769/api/Plumber/align
const GetComplement = async (
    seq: string,
    to_reverse: boolean,
    to_complement: boolean
): Promise<ResponseBioconductor<DataComplement>> => {
    const response = await fetch(`${DOTNET_BIOCONDUCTOR_URL}/complement`, {
        method: "POST",
        body: JSON.stringify({
            seq: seq,
            to_reverse: to_reverse,
            to_complement: to_complement,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(response);
    const data = await response.json();
    return data;
};

//https://localhost:32789/api/Plumber/detail?value=slos&full=false
const GetDetail = async (
    value: string
): Promise<ResponseBioconductor<DataDetail>> => {
    const full = false;
    const response = await fetch(
        `${DOTNET_BIOCONDUCTOR_URL}/detail?value=${value}&full=${full}`
    );
    const data = await response.json();
    return data;
};
const GetFullDetail = async (
    value: string
): Promise<ResponseBioconductor<DataFullDetail>> => {
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
): Promise<ResponseBioconductor<DataPercent>> => {
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
): Promise<ResponseBioconductor<DataSequence>> => {
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
): Promise<ResponseBioconductor<DataStats>> => {
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
): Promise<ResponseBioconductor<DataSequence>> => {
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

export {
    GetAlign,
    GetAutocomplete,
    GetComplement,
    GetDetail,
    GetFullDetail,
    GetPercent,
    GetSequence,
    GetStats,
    GetSequenceByRange,
    getMessage,
};
