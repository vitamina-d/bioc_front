import type { ShowToast } from "../context/ToastContext";

async function apiRequestToast<T>(
    showToast: ShowToast,
    url: string,
    options?: RequestInit
): Promise<T | null> {
    try {
        console.log("[apiRequest]");
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

            showToast(errorMessage, "Warning", "warning");
            return null;
        } 
        const json = await response.json();
        console.log(response);
        console.log(json);
        return json as T;
    } catch {
        showToast("No se pudo conectar al servidor", "Error", "danger");
        return null;
    }
}
export default apiRequestToast;
