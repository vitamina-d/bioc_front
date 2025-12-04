const downloadFile = (pdb: string, filename: string) => {
    const blob = new Blob([pdb], { type: "chemical/x-pdb" }); //memoria o { type: "text/plain" }
    const url = URL.createObjectURL(blob); //enlace de descarga

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
};
export { downloadFile };
