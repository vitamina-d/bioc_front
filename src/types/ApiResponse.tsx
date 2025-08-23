export type ApiResponse = {
    status: string;
    time_secs: number;
    data: ResponseData;
}

export type ResponseData = {
  nucleotides: Nucleotides;
  counter_CpG: number;
  CpG_ranges: CpGRange[];
}

export type Nucleotides = {
    labels: string[];
    counts: number[];
}

export type CpGRange = {
  start: number;
  end: number;
  width: number;
}
