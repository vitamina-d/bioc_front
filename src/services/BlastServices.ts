import { DOTNET_BLAST_URL } from "../config/constant";
import type { ResponsePlumber } from "../types/ResponsePlumber";

//https://localhost:32769/api/Plumber/align
const GetAlign = async (
    pattern: string,
    subject: string,
    type: string, //#* @param type "global", "local", "overlap"
    gapOpening: number, // >=0
    gapExtension: number // >=0
): Promise<ResponsePlumber<Report>> => {
    const response = await fetch(`${DOTNET_BLAST_URL}/align`, {
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
    });
    console.log(response);
    const data = await response.json();
    return data;
};

export { GetAlign };
