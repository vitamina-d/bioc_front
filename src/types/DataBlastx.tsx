export type Report = {
    program: string;
    version: string;
    reference: string;
    search_target: {
        db: string;
    };
    params: Params;
    results: {
        search: Search;
    };
}

export type Params = {
    matrix: string;
    expect: number;
    gap_open: number;
    gap_extend: number;
    filter: string;
    cbs: number;
    query_gencode: number;
}

export type Search = {
    query_id: string;
    query_len: number;
    query_masking: QueryMasking[];
    hits: Hit[];
    stat: Stat;
    message: string;
}

export type QueryMasking = {
    from: number;
    to: number;
}

export type Hit = {
    num: number;
    description: Description[];
    len: number;
    hsps: Hsp[];
}

export type Description = {
    id: string;
    accession: string;
    title: string;
    taxid: number;
}

export type Hsp = {
    num: number;
    bit_score: number;
    score: number;
    evalue: number;
    identity: number;
    positive: number;
    query_from: number;
    query_to: number;
    query_frame: number;
    hit_from: number;
    hit_to: number;
    align_len: number;
    gaps: number;
    qseq: string;
    hseq: string;
    midline: string;
}

export type Stat = {
    db_num: number;
    db_len: number;
    hsp_len: number;
    eff_space: number;
    kappa: number;
    lambda: number;
    entropy: number;
}
