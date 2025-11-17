const validateNucleotides = (sequence: string): boolean => {
    const regex = /^[ACGTN]+$/i; 
    if (regex.test(sequence)) {
        return true;
    } else {
        return false;
    }
};
export { validateNucleotides };
