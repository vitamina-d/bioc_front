import { DOTNET_BLAST_URL } from "../config/urls";
import type { BlastxReport } from "../types/DataBlastx";
import type { Response } from "../types/Response";

const PostBlastx = async (
    sequence: string
): Promise<Response<BlastxReport>> => {
    console.log("[BLAST] POST /blastx");

    const response = await fetch(`${DOTNET_BLAST_URL}/blastx`, {
        method: "POST",
        body: JSON.stringify({
            sequence: sequence,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const json = await response.json();
    console.log(response);
    console.log(json);
    return json;
};

export { PostBlastx };
