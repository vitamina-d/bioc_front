import { DOTNET_BLAST_URL } from "../config/urls";
import type { BlastxReport } from "../types/DataBlastx";
import type { ResponsePlumber } from "../types/ResponsePlumber";

const PostBlastx = async (
    sequence: string
): Promise<ResponsePlumber<BlastxReport>> => {
    console.log("blastx service");
    const response = await fetch(`${DOTNET_BLAST_URL}/blastx`, {
        method: "POST",
        body: JSON.stringify({
            sequence: sequence,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(response);
    const data = await response.json();
    return data;
};

export { PostBlastx };
