import { DOTNET_BIOCONDUCTOR_URL } from "../config/urls";
import type { Response } from "../types/Response";
import type {
    DataAlign,
    DataEntrez,
    DataSequence,
    DataStats,
} from "../types/DataPlumber";
import type { ShowToast } from "../context/ToastContext";
import apiRequest from "../wrapper/apiRequest";
import apiRequestToast from "../wrapper/apiRequestToast";

const GetAlign = async (
    pattern: string,
    subject: string,
    type: string, //#* @param type "global", "local", "overlap"
    gapOpening: number, // >=0
    gapExtension: number, // >=0
    showToast: ShowToast
): Promise<Response<DataAlign> | null> => {
    console.log("[BIOC] POST /align");
    const url = `${DOTNET_BIOCONDUCTOR_URL}/align`;
    const options = {
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
    };

    const json = await apiRequestToast<Response<DataAlign>>(
        showToast,
        url,
        options
    );
    return json;
};

const GetAutocomplete = async (
    value: string
): Promise<Response<string[]> | null> => {
    console.log("[BIOC] GET /autocomplete");
    const url = `${DOTNET_BIOCONDUCTOR_URL}/autocomplete?input=${value}`;
    const json = await apiRequest<Response<string[]>>(url);
    return json;
};

const GetDetail = async (
    entrez: string,
    isFull: boolean,
    showToast: ShowToast
): Promise<Response<any> | null> => {
    console.log("[BIOC] GET /detail");
    const url = `${DOTNET_BIOCONDUCTOR_URL}/detail?entrez=${entrez}&isFull=${isFull}`;
    const json = await apiRequest<Response<any>>(url);
    if (json?.data == null) {
        showToast("No se obtuvo detalle", "Warning", "warning");
        return null;
    }
    return json;
};

const GetPercent = async (
    sequence: string
): Promise<Response<DataStats> | null> => {
    console.log("[BIOC] POST /percent");
    const url = `${DOTNET_BIOCONDUCTOR_URL}/percent`;
    const options = {
        method: "POST",
        body: JSON.stringify(sequence),
        headers: {
            "Content-Type": "application/json",
        },
    };
    const json = await apiRequest<Response<any>>(url, options);

    return json;
};

const GetSequence = async (
    value: string,
    complete: boolean,
    showToast: ShowToast
): Promise<Response<DataSequence[]> | null> => {
    console.log("[BIOC] GET /sequence");
    const url = `${DOTNET_BIOCONDUCTOR_URL}/sequence?value=${value}&complete=${complete}`;
    const json = await apiRequestToast<Response<DataSequence[]>>(
        showToast,
        url
    );
    return json;
};

const GetStats = async (
    entrez: string,
    complete: boolean,
    showToast: ShowToast
): Promise<Response<DataStats> | null> => {
    console.log("[BIOC] GET /stats");
    const url = `${DOTNET_BIOCONDUCTOR_URL}/stats?entrez=${entrez}&complete=${complete}`;
    const json = await apiRequestToast<Response<DataStats>>(showToast, url);
    return json;
};

const GetSequenceByRange = async (
    chr: string, //11, X, Y
    start: number,
    end: number,
    showToast: ShowToast
): Promise<Response<DataSequence[]> | null> => {
    console.log("[BIOC] GET /sequence");
    const url = `${DOTNET_BIOCONDUCTOR_URL}/sequence_by_range?chrom=${chr}&start=${start}&end=${end}`;
    const json = await apiRequestToast<Response<DataSequence[]>>(
        showToast,
        url
    );
    return json;
};

const getEntrez = async (
    value: string,
    showToast: ShowToast
): Promise<Response<DataEntrez> | null> => {
    console.log("[BIOC] GET /entrez");
    const url = `${DOTNET_BIOCONDUCTOR_URL}/entrez/${value}`;
    const json = await apiRequestToast<Response<DataEntrez>>(showToast, url);
    return json;
};

export {
    GetAlign,
    GetAutocomplete,
    GetDetail,
    GetPercent,
    GetSequence,
    GetStats,
    GetSequenceByRange,
    getEntrez,
};
