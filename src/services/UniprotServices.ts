import { DOTNET_PUBLIC_URL } from "../constant/urls";
import type { ShowToast } from "../context/ToastContext";
import apiRequestFile from "../wrapper/apiRequestFile";

const GetModel = async (
    uniprotId: string,
    showToast: ShowToast
): Promise<string | null> => {
    console.log("[FOLD] GET /model/uniprotId");
    const url = `${DOTNET_PUBLIC_URL}/model/${uniprotId}`;
    const options: RequestInit = {
        method: "GET",
    };

    const file = await apiRequestFile(url, options, showToast);
    //console.log(file);
    return file;
};

export { GetModel };
