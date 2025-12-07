import { DOTNET_FOLD_URL } from "../constant/urls";
import type { ShowToast } from "../context/ToastContext";
import type { pLDDTNeurosnap } from "../types/pLDDT";
import type { Response } from "../types/Response";
import type { ProteinRanks } from "../types/ResponseFolding";
import apiRequest from "../wrapper/apiRequest";
import apiRequestFile from "../wrapper/apiRequestFile";

//ENVIAR API KEY
const InitJob = async (
    aminoacid: string,
    showToast: ShowToast
): Promise<Response<string> | null> => {
    console.log("[FOLD] POST /init");
    const APIKey = sessionStorage.getItem("APIKey");
    /*const url = `${DOTNET_FOLD_URL}/init`;
    const options: RequestInit = {
        method: "POST",
        body: JSON.stringify({
            aminoacid: aminoacid,
        }),
        headers: {
            "X-API-KEY": APIKey ? APIKey : "",
        },
    };
    const json = await apiRequest<Response<string>>(url, options, showToast);

    return json;
    
      */
    return {
        code: 200,
        message: "Ok",
        data: "68e17d82e986d44f8b7e9e1b",
    };
};

const StatusJob = async (
    jobId: string,
    showToast: ShowToast
): Promise<Response<string> | null> => {
    console.log("[FOLD] POST /status/jobId");
    const APIKey = sessionStorage.getItem("APIKey");
    const url = `${DOTNET_FOLD_URL}/status/${jobId}`;
    const options: RequestInit = {
        method: "GET",
        headers: {
            "X-API-KEY": APIKey ? APIKey : "",
        },
    };

    const json = await apiRequest<Response<string>>(url, options, showToast);
    return json;
};

const GetRanksJob = async (
    jobId: string,
    showToast: ShowToast
): Promise<Response<ProteinRanks> | null> => {
    console.log("[FOLD] GET /job/ranks");
    const APIKey = sessionStorage.getItem("APIKey");
    const url = `${DOTNET_FOLD_URL}/job/${jobId}/ranks`;
    const options: RequestInit = {
        method: "GET",
        headers: {
            "X-API-KEY": APIKey ? APIKey : "",
        },
    };
    const json = await apiRequest<Response<ProteinRanks>>(
        url,
        options,
        showToast
    );
    return json;
};

const GetAlignPrediction = async (
    jobId: string,
    rank: string,
    accession: string,
    showToast: ShowToast
): Promise<string | null> => {
    console.log("[FOLD] GET /job/rank/accession");
    const APIKey = sessionStorage.getItem("APIKey");
    const url = `${DOTNET_FOLD_URL}/job/${jobId}/rank_${rank}/align/${accession}`;
    const options: RequestInit = {
        method: "GET",
        headers: {
            "X-API-KEY": APIKey ? APIKey : "",
        },
    };
    const file = await apiRequestFile(url, options, showToast);
    return file;
};

const GetpLDDTPrediction = async (
    jobId: string,
    rank: string,
    showToast: ShowToast
): Promise<Response<pLDDTNeurosnap> | null> => {
    console.log("[FOLD] GET /api/Folding/job/rank/pLDDT");
    const APIKey = sessionStorage.getItem("APIKey");
    const url = `${DOTNET_FOLD_URL}/job/${jobId}/rank_${rank}/pLDDT`;
    const options: RequestInit = {
        method: "GET",
        headers: {
            "X-API-KEY": APIKey ? APIKey : "",
        },
    };
    const json = await apiRequest<Response<pLDDTNeurosnap>>(
        url,
        options,
        showToast
    );
    return json;
};

// -------------------- NO ENVIAR API KEY
const GetModelReference = async (
    accession: string,
    showToast: ShowToast
): Promise<string | null> => {
    console.log("[FOLD] GET /model/accession");

    const url = `${DOTNET_FOLD_URL}/model/${accession}`;
    const options: RequestInit = {
        method: "GET",
    };
    const file = await apiRequestFile(url, options, showToast);
    return file;
};

export {
    InitJob,
    StatusJob,
    GetRanksJob,
    GetAlignPrediction,
    GetModelReference,
    GetpLDDTPrediction,
};
