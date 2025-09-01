import { DOTNET_PLUMBER_URL } from "../config/constant";
import type {
    DataAlign,
    DataComplement,
    DataDetail,
    DataFullDetail,
    DataPercent,
    DataSequence,
    DataStats,
    ResponsePlumber,
} from "../types/ResponsePlumber";

//https://localhost:32769/api/Plumber/align
const GetAlign = async (
    pattern: string,
    subject: string,
    type: string, //#* @param type "global", "local", "overlap"
    gapOpening: number, // >=0
    gapExtension: number // >=0
): Promise<ResponsePlumber<DataAlign>> => {
    const response = await fetch(`${DOTNET_PLUMBER_URL}/align`, {
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

//https://localhost:32769/api/Plumber/align
const GetComplement = async (
    seq: string,
    to_reverse: boolean,
    to_complement: boolean
): Promise<ResponsePlumber<DataComplement>> => {
    const response = await fetch(`${DOTNET_PLUMBER_URL}/complement`, {
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
): Promise<ResponsePlumber<DataDetail>> => {
    const full = false;
    const response = await fetch(
        `${DOTNET_PLUMBER_URL}/detail?value=${value}&full=${full}`
    );
    const data = await response.json();
    return data;
};
const GetFullDetail = async (
    value: string
): Promise<ResponsePlumber<DataFullDetail>> => {
    const full = true;
    const response = await fetch(
        `${DOTNET_PLUMBER_URL}/detail?value=${value}&full=${full}`
    );
    const data = await response.json();
    return data;
};

//https://localhost:32789/api/Plumber/percent
const GetPercent = async (
    sequence: string
): Promise<ResponsePlumber<DataPercent>> => {
    const response = await fetch(`${DOTNET_PLUMBER_URL}/percent`, {
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
        `${DOTNET_PLUMBER_URL}/sequence?value=${value}&complete=${complete}`
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
        `${DOTNET_PLUMBER_URL}/stats?entrez=${entrez}&complete=${complete}`
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
        `${DOTNET_PLUMBER_URL}/sequence_by_range?chrom=${chr}&start=${start}&end=${end}`
    );
    const data = await response.json();
    console.log(response);
    console.log(data);
    return data;
};

//https://localhost:32769/api/Plumber/msg?msg=${msg}
const getMessage = async (msg: string): Promise<string> => {
    const response = await fetch(
        `${DOTNET_PLUMBER_URL}/msg?msg=${encodeURIComponent(msg)}`
    );
    const data = await response.json();
    return data;
};

export {
    GetAlign,
    GetComplement,
    GetDetail,
    GetFullDetail,
    GetPercent,
    GetSequence,
    GetStats,
    GetSequenceByRange,
    getMessage,
};
