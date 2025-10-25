import { DOTNET_BIOCONDUCTOR_URL } from "../config/urls";
import type { Response } from "../types/Response";
import type {
    DataAlign,
    DataDetail,
    DataEntrez,
    DataFullDetail,
    DataSequence,
    DataStats,
} from "../types/DataPlumber";

const GetAlign = async (
    pattern: string,
    subject: string,
    type: string, //#* @param type "global", "local", "overlap"
    gapOpening: number, // >=0
    gapExtension: number // >=0
): Promise<Response<DataAlign>> => {
    console.log("[BIOC] POST /align");
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
    const json = await response.json();
    console.log(json);
    return json;
};

const GetAutocomplete = async (value: string): Promise<Response<string[]>> => {
    console.log("[BIOC] GET /autocomplete");
    const response = await fetch(
        `${DOTNET_BIOCONDUCTOR_URL}/autocomplete?input=${value}`
    );
    const json = await response.json();
    console.log(response);
    console.log(json);
    return json;
};

const GetDetail = async (entrez: string): Promise<Response<DataDetail>> => {
    console.log("[BIOC] GET /detail");
    var isFull: boolean = false;
    const response = await fetch(
        `${DOTNET_BIOCONDUCTOR_URL}/detail?entrez=${entrez}&isFull=${isFull}`
    );
    const json = await response.json();
    console.log(response);
    console.log(json);
    return json;
};
const GeFullDetail = async (entrez: string): Promise<Response<DataFullDetail>> => {
    console.log("[BIOC] GET /detail");
    var isFull: boolean = true;
    const response = await fetch(
        `${DOTNET_BIOCONDUCTOR_URL}/detail?entrez=${entrez}&isFull=${isFull}`
    );
    const json = await response.json();
    console.log(response);
    console.log(json);
    return json;
};

const GetPercent = async (sequence: string): Promise<Response<DataStats>> => {
    console.log("[BIOC] POST /percent");
    const response = await fetch(`${DOTNET_BIOCONDUCTOR_URL}/percent`, {
        method: "POST",
        body: JSON.stringify(sequence),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const json = await response.json();
    console.log(response);
    console.log(json);
    return json;
};

const GetSequence = async (
    value: string,
    complete: boolean
): Promise<Response<DataSequence[]>> => {
    console.log("[BIOC] GET /sequence");
    const response = await fetch(
        `${DOTNET_BIOCONDUCTOR_URL}/sequence?value=${value}&complete=${complete}`
    );
    const json = await response.json();
    console.log(response);
    console.log(json);
    return json;
};

const GetStats = async (
    entrez: string,
    complete: boolean
): Promise<Response<DataStats>> => {
    console.log("[BIOC] GET /stats");
    const response = await fetch(
        `${DOTNET_BIOCONDUCTOR_URL}/stats?entrez=${entrez}&complete=${complete}`
    );
    const json = await response.json();
    console.log(response);
    console.log(json);
    return json;
};

const GetSequenceByRange = async (
    chr: string, //11, X, Y
    start: number,
    end: number
): Promise<Response<DataSequence[]>> => {
    console.log("[BIOC] GET /sequence");
    const response = await fetch(
        `${DOTNET_BIOCONDUCTOR_URL}/sequence_by_range?chrom=${chr}&start=${start}&end=${end}`
    );
    const json = await response.json();
    console.log(response);
    console.log(json);
    return json;
};

const getEntrez = async (value: string): Promise<Response<DataEntrez>> => {
    console.log("[BIOC] GET /entrez");
    console.log(value);
    const response = await fetch(`${DOTNET_BIOCONDUCTOR_URL}/entrez/${value}`);
    const json = await response.json();
    console.log(response);
    console.log(json);
    return json;
};

export {
    GetAlign,
    GetAutocomplete,
    GetDetail,
    GeFullDetail,
    GetPercent,
    GetSequence,
    GetStats,
    GetSequenceByRange,
    getEntrez,
};
