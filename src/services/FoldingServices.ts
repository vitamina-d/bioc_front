import { DOTNET_FOLD_URL } from "../config/constant";

//http://localhost:8081/api/Folding/job/68e17d82e986d44f8b7e9e1b/rank_3/align/4quv
const GetEstructureAlign = async ( pdbId: string, jobId: string, rank: string): Promise<string> => {
    console.log("folding service")
    const response = await fetch(`${DOTNET_FOLD_URL}/job/${jobId}/rank_${rank}/align/${pdbId}`);
    console.log(response);
    const data = await response.text();
    console.log(data);
    return data;
};

export { GetEstructureAlign };
