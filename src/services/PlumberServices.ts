import type { ResponsePlumberSequence } from "../types/ResponsePlumberSequence";
import type { ResponsePlumberAlign } from "../types/ResponsePlumberAlign";
import type { ResponsePlumberDetail } from "../types/ResponsePlumberDetail";
import type { ResponsePlumberPercent } from "../types/ResponsePlumberPercent";
import { DOTNET_PLUMBER_URL } from "../config/constant";

//https://localhost:32769/api/Plumber/detail?gene_symbol=${gene_symbol}
const GetDetail = async (value: string): Promise<ResponsePlumberDetail> => {
    const response = await fetch(`${DOTNET_PLUMBER_URL}/detail?entrez=${value}`);
    const data = await response.json();
    return data;
};

//https://localhost:32769/api/Plumber/sequence_by_symbol?gene_symbol=${gene_symbol}&complete=${complete}
const GetSequence = async (
    value: string,
    complete: boolean
): Promise<ResponsePlumberSequence> => {
    const response = await fetch(
        `${DOTNET_PLUMBER_URL}/sequence?entrez=${value}&complete=${complete}`
    );
    const data = await response.json();
    return data;
};

//https://localhost:32769/api/Plumber/percent?seq=${sequence}
const GetPercent = async (
    sequence: string
): Promise<ResponsePlumberPercent> => {
    const response = await fetch(`${DOTNET_PLUMBER_URL}/percent`, {
        method: "POST",
        body: JSON.stringify(sequence),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
};

//https://localhost:32769/api/Plumber/align?pattern=${}&subject=${}&global=${}
const GetAlign = async (
    pattern: string,
    subject: string,
    global: boolean
): Promise<ResponsePlumberAlign> => {
    
    const response = await fetch(
        `${DOTNET_PLUMBER_URL}/align`, { 
        method: "POST",
        body: JSON.stringify({pattern : pattern, subject : subject, global : global }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(response);
    const data = await response.json();
    return data;
};

//https://localhost:32769/api/Plumber/sequence_by_range?chrom=${}&start=${}&end=${}
const GetSequenceByRange = async (
    chr: string,
    start: number,
    end: number
): Promise<ResponsePlumberSequence> => {
    const response = await fetch(
        `${DOTNET_PLUMBER_URL}/sequence?chrom=chr${chr}&start=${start}&end=${end}`
    );
    const data = await response.json();

    console.log(response);
    console.log(data); //{response: '{"status":"success","time_secs":0.0021,"data":{"se…h":12,"sequence":"NNNNNNNNNNNN","complete":true}}'}
    return data;
};
export { GetDetail, GetSequence, GetPercent, GetAlign, GetSequenceByRange };
/*
    //https://localhost:32769/api/Plumber/msg?msg=${msg}
    const getMessage = async (msg: string): Promise<string> => {
        const response = await fetch(
            `${DOTNET_PLUMBER_URL}/msg?msg=${encodeURIComponent(msg)}`
        );
        const data = await response.json();
        return data;
    };
    */
