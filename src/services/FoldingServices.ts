import { DOTNET_FOLD_URL } from "../config/urls";
import type { ShowToast } from "../context/ToastContext";
import type { pLDDTModel, pLDDTNeurosnap } from "../types/pLDDT";
import type { Response } from "../types/Response";
import type { ProteinRanks } from "../types/ResponseFolding";
import apiRequest from "../wrapper/apiRequest";

const InitJob = async (
    aminoacid: string,
    showToast: ShowToast
): Promise<Response<string> | null> => {
    console.log("[FOLD] POST /init");
    const url = `${DOTNET_FOLD_URL}/init`;
    const options = {
        method: "POST",
        body: JSON.stringify({
            aminoacid: aminoacid,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    };
    const json = await apiRequest<Response<string>>(showToast, url, options);

    //if json showtoast
    
    return json;

    /*
    return {
        code: 200,
        message: "Ok",
        data: "68e17d82e986d44f8b7e9e1b",
    };    */
};

const StatusJob = async (
    jobId: string,
    showToast: ShowToast
): Promise<Response<string> | null> => {
    console.log("[FOLD] POST /status/jobId");
    const url = `${DOTNET_FOLD_URL}/status/${jobId}`;
    const json = await apiRequest<Response<string>>(showToast, url);
    return json;
};

type Data = {
    data: ProteinRanks;
};
const GetRanksJob = async (jobId: string): Promise<Response<ProteinRanks>> => {
    console.log("[FOLD] GET /job/ranks");

    const response = await fetch(`${DOTNET_FOLD_URL}/job/${jobId}/ranks`);
    const json: Data = await response.json();
    console.log(response);
    console.log(json);
    return {
        code: response.status,
        message: response.statusText,
        data: json.data,
    }; //prot1 se envia en jobinit .net
};

const GetAlignPrediction = async (
    jobId: string,
    rank: string,
    accession: string
): Promise<string> => {
    console.log("[FOLD] GET /job/rank/accession");

    const response = await fetch(
        `${DOTNET_FOLD_URL}/job/${jobId}/rank_${rank}/align/${accession}`
    );
    const pdbFile: string = await response.text();
    return pdbFile;
};
const GetModelReference = async (accession: string): Promise<string> => {
    console.log("[FOLD] GET /model/accession");

    const response = await fetch(`${DOTNET_FOLD_URL}/model/${accession}`);
    const pdbFile: string = await response.text();
    return pdbFile;
};
const GetpLDDTPrediction = async (
    jobId: string,
    rank: string
): Promise<Response<pLDDTNeurosnap>> => {
    console.log("[FOLD] GET /api/Folding/job/rank/pLDDT");

    const response = await fetch(
        `${DOTNET_FOLD_URL}/job/${jobId}/rank_${rank}/pLDDT`
    );
    const json = await response.json();
    console.log(response);
    console.log(json);
    return json;
};
const GetpLDDTModel = async (
    accession: string
): Promise<Response<pLDDTModel>> => {
    console.log("[FOLD] GET /api/Folding/model/pLDDT/accession");

    const response = await fetch(`${DOTNET_FOLD_URL}/model/pLDDT/${accession}`);
    const json = await response.json();
    console.log(response);
    console.log(json);
    return json;
};

export {
    InitJob,
    StatusJob,
    GetRanksJob,
    GetAlignPrediction,
    GetModelReference,
    GetpLDDTPrediction,
    GetpLDDTModel,
};
