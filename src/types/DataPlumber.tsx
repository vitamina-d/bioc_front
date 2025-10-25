export type DataAlign = {
    score: number;
    pattern_align: string;
    subject_align: string;
};

export type DataComplement = {
    sequence: string;
    to_reverse: boolean;
    to_complement: boolean;
};

export type DataDetail = {
    entrez: string;
    symbol: string;
    genename: string;
    genetype: string;
    alias?: string[];
};

export type DataFullDetail = DataDetail & {
    location: Location[];
    ensembl_id_gene: string[];
    ensembl_id_protein: string[];
    uniprot_ids: string[];
    citogenetic: string;
};

export type Location = {
    strand: string; //+ o -
    seqnames: string;
    start: number;
    end: number;
    length: number;
};

export type DataPercent = {
    composition: Composition;
    cpg_islands: CPG;
};

export type Composition = {
    length: number;
    nucleotides: Nucleotides;
};

export type CPG = {
    count: number;
    start: number[];
};

export type Nucleotides = {
    A: number;
    C: number;
    G: number;
    T: number;
    other: number;
};

export type DataSequence = {
    index: string;
    start: number;
    end: number;
    length: number;
    sequence: string;
};

export type DataStats = {
    length: number;
    nucleotides: Nucleotides;
    cpg_islands: CPG;
    sequence: string;
};

export type DataTable = {
    count: number;
    table: Id[];
};

export type Id = {
    ENTREZID: string;
    SYMBOL: string;
};

export type DataEntrez = {
    entrez: string;
};
