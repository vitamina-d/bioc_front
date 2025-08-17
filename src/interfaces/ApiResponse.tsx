export interface ApiResponse {
    status: string;
    time_secs: number;
    data: ResponseData;
}

export interface ResponseData {
  nucleotides: Nucleotides;
  counter_CpG: number;
  CpG_ranges: CpGRange[];
}

export interface Nucleotides {
    labels: string[];
    counts: number[];
}

export interface CpGRange {
  start: number;
  end: number;
  width: number;
}
