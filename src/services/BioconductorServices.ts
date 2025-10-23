import { DOTNET_BIOCONDUCTOR_URL } from "../config/urls";
import type { Response } from "../types/Response";
import type {
    DataAlign,
    DataDetail,
    DataEntrez,
    DataFullDetail,
    DataPercent,
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
    const response = await fetch(
        `${DOTNET_BIOCONDUCTOR_URL}/autocomplete?input=${value}`
    );
    const json = await response.json();
    console.log(response);
    console.log(json);
    return json;
};

const GetDetail = async (value: string): Promise<Response<DataDetail>> => {
    const full = false;
    const response = await fetch(
        `${DOTNET_BIOCONDUCTOR_URL}/detail?value=${value}&full=${full}`
    );
    const json = await response.json();
    console.log(response);
    console.log(json);
    return json;
};

const GetFullDetail = async (
    value: string
): Promise<Response<DataFullDetail>> => {
    const full = true;
    const response = await fetch(
        `${DOTNET_BIOCONDUCTOR_URL}/detail?value=${value}&full=${full}`
    );
    const json = await response.json();
    console.log(response);
    console.log(json);
    return json;
};

const GetPercent = async (sequence: string): Promise<Response<DataPercent>> => {
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
): Promise<Response<DataSequence>> => {
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
): Promise<Response<DataSequence>> => {
    const response = await fetch(
        `${DOTNET_BIOCONDUCTOR_URL}/sequence_by_range?chrom=${chr}&start=${start}&end=${end}`
    );
    const json = await response.json();
    console.log(response);
    console.log(json);
    return json;
};

const getEntrez = async (value: string): Promise<Response<DataEntrez>> => {
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
    GetFullDetail,
    GetPercent,
    GetSequence,
    GetStats,
    GetSequenceByRange,
    getEntrez,
};
