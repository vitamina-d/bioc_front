import { DOTNET_FOLD_URL } from "../config/urls";
import type {
    ProteinRanks,
    ResponseRanks,
    ResponseStatus,
} from "../types/ResponseFolding";

const InitJob = async (aminoacid: string): Promise<string> => { //jobId
    const response = await fetch(`${DOTNET_FOLD_URL}/init`, {
        method: "POST",
        body: JSON.stringify({
            aminoacid: aminoacid,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(response);
    const data = await response.json();
    return data;
};

const StatusJob = async (jobId: string): Promise<ResponseStatus> => {
    //console.log("SERVICE ---- ", jobId)
    const response = await fetch(`${DOTNET_FOLD_URL}/status/${jobId}`);
    //console.log(response);
    const json = await response.json();
    return json;
};

const GetRanksJob = async (jobId: string): Promise<ProteinRanks> => {
    const response = await fetch(`${DOTNET_FOLD_URL}/job/${jobId}/ranks`);
    //console.log(response);
    const json: ResponseRanks = await response.json();
    return json.prot1; //prot1 se envia en jobinit .net
};

const GetAlignPrediction = async (
    jobId: string,
    rank: string,
    pdbId: string
): Promise<string> => {
    const response = await fetch(
        `${DOTNET_FOLD_URL}/job/${jobId}/rank_${rank}/align/${pdbId}`
    );
    //console.log("----------------------------------------------", response);
    const pdbFile: string = await response.text();
    return pdbFile;
};

export {
    InitJob,
    StatusJob,
    GetRanksJob,
    GetAlignPrediction,
};
