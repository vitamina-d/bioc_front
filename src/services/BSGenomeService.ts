const BSGenomeService = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const data = await response.json();
    return data.sequence;
};

export default BSGenomeService;
