import type { ShowToast } from "../context/ToastContext";

async function apiRequestFile(
    url: string,
    options: RequestInit,
    showToast?: ShowToast
): Promise<string | null> {
    try {
        console.log("[apiRequestFile]");
        const response = await fetch(url, options);
        console.log(response);

        if (!response.ok) {
            var errorMessage = `Error ${response.status}`;

            try {
                const errorJson = await response.json();
                if (errorJson?.message) {
                    errorMessage = errorJson.message;
                }
            } catch {
                errorMessage = response.statusText;
            }
            if (showToast) showToast(errorMessage, "Warning", "warning");
            return null;
        }
        const pdbFile: string = await response.text();
        return pdbFile;
    } catch {
        if (showToast)
            showToast("No se pudo conectar al servidor", "Warning", "warning");
        return null;
    }
}

export default apiRequestFile;
