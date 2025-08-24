export type ResponsePlumberPercent = {
    status: string;
    time_secs: number;
    data: DataPlumberPercent;
};

export type DataPlumberPercent = {
    composition: CompositionSequence;
    cpg_islands: Islands;
};

type CompositionSequence = {
    length: number;
    nucleotides: Nucleotides;
    at_percent: number;
    cg_percent: number;
};

export type Nucleotides = {
    A: number;
    T: number;
    C: number;
    G: number;
};

type Islands = {
    length: number;
    ranges: Range[];
};

type Range = {
    start: number;
    end: number;
    width: number;
};
