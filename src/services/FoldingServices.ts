import { DOTNET_FOLD_URL } from "../config/urls";
import type { ProteinRanks, ResponseRanks, ResponseStatus } from "../types/ResponseFolding";

//http://localhost:8081/api/Folding/job/68e17d82e986d44f8b7e9e1b/rank_3/align/4quv
const GetEstructureAlign = async ( pdbId: string, jobId: string, rank: string): Promise<string> => {
    console.log("folding service")
    const response = await fetch(`${DOTNET_FOLD_URL}/job/${jobId}/rank_${rank}/align/${pdbId}`);
    console.log(response);
    const data = await response.text();
    console.log(data);
    return data;
};

const InitJob = async (
    aminoacid: string,
): Promise<string> => { //jobId
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

const StatusJob = async ( jobId: string ): Promise<ResponseStatus> => {
    const response = await fetch(`${DOTNET_FOLD_URL}/status/${jobId}`);
    console.log(response);
    const json = await response.json();
    return json;
};

const GetRanksJob = async ( jobId: string ): Promise<ProteinRanks> => {
    const response = await fetch(`${DOTNET_FOLD_URL}/job/${jobId}/ranks`);
    console.log(response);
    const json:ResponseRanks = await response.json();
    return json.prot1; //prot1 se envia en jobinit .net
};
export { GetEstructureAlign, InitJob, StatusJob, GetRanksJob };
