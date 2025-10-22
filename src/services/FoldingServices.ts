import { DOTNET_FOLD_URL } from "../config/urls";
import type { Response } from "../types/Response";
import type {
    ProteinRanks,
    ResponseRanks,
    ResponseStatus,
} from "../types/ResponseFolding";

const InitJob = async (aminoacid: string): Promise<Response<string>> => {
    console.log("[FOLD] POST /init");

    const response = await fetch(`${DOTNET_FOLD_URL}/init`, {
        method: "POST",
        body: JSON.stringify({
            aminoacid: aminoacid,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const json = await response.json();
    console.log(response);
    console.log(json);
    console.log("SIEMPRE JOB: 68e17d82e986d44f8b7e9e1b");
    return {
        code: response.status,
        message: response.statusText,
        data: "68e17d82e986d44f8b7e9e1b",
    };
};

const StatusJob = async (jobId: string): Promise<Response<ResponseStatus>> => {
    console.log("[FOLD] POST /status/jobId");

    const response = await fetch(`${DOTNET_FOLD_URL}/status/${jobId}`);
    const json = await response.json();
    console.log(response);
    console.log(json);
    return {
        code: response.status,
        message: response.statusText,
        data: json,
    };
};

const GetRanksJob = async (jobId: string): Promise<Response<ProteinRanks>> => {
    console.log("[FOLD] GET /job/ranks");

    const response = await fetch(`${DOTNET_FOLD_URL}/job/${jobId}/ranks`);
    const json: ResponseRanks = await response.json();
    console.log(response);
    console.log(json);
    return {
        code: response.status,
        message: response.statusText,
        data: json.prot1,
    }; //prot1 se envia en jobinit .net
};

const GetAlignPrediction = async (
    jobId: string,
    rank: string,
    pdbId: string
): Promise<Response<string>> => {
    console.log("[FOLD] GET /job/rank/pdbId");

    const response = await fetch(
        `${DOTNET_FOLD_URL}/job/${jobId}/rank_${rank}/align/${pdbId}`
    );
    const pdbFile: string = await response.text();
    return {
        code: response.status,
        message: response.statusText,
        data: pdbFile,
    };
};

export { InitJob, StatusJob, GetRanksJob, GetAlignPrediction };
