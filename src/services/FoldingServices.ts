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
    console.log("SET JOB: 68e17d82e986d44f8b7e9e1b");

    return {
        code: response.status,
        message: response.statusText,
        //data: json.data,        
        data: "68e17d82e986d44f8b7e9e1b",        
    };
};

const StatusJob = async (jobId: string): Promise<Response<string>> => {
    console.log("[FOLD] POST /status/jobId");
    const response = await fetch(`${DOTNET_FOLD_URL}/status/${jobId}`);
    const json = await response.json();
    console.log(response);
    console.log(json);
    return json;
};
type Data = {
    data: ProteinRanks;
}
const GetRanksJob = async (jobId: string): Promise<Response<ProteinRanks>> => {
    console.log("[FOLD] GET /job/ranks");
    console.log("SET JOB: 68e17d82e986d44f8b7e9e1b");
    jobId = "68e17d82e986d44f8b7e9e1b";

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
    pdbId: string
): Promise<string> => {
    console.log("[FOLD] GET /job/rank/pdbId");
    console.log("SET JOB: 68e17d82e986d44f8b7e9e1b");
    jobId = "68e17d82e986d44f8b7e9e1b";

    const response = await fetch(
        `${DOTNET_FOLD_URL}/job/${jobId}/rank_${rank}/align/${pdbId}`
    );
    const pdbFile: string = await response.text();
    return pdbFile;
};

export { InitJob, StatusJob, GetRanksJob, GetAlignPrediction };
