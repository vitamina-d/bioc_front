import type { ShowToast } from "../context/ToastContext";

async function apiRequest<T>(
    url: string,
    options: RequestInit,
    showToast?: ShowToast
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
            if (showToast) showToast(errorMessage, "Warning", "warning");
            return null;
        }
        const json = await response.json();
        console.log(response);
        console.log(json);
        return json as T;
    } catch {
        if (showToast)
            showToast("No se pudo conectar al servidor", "Warning", "warning");
        return null;
    }
}

export default apiRequest;
