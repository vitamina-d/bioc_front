export type ResponsePlumberAlign = {
  status: string;
  time_secs: number;
  data: DataPlumberAlign;
};

export type DataPlumberAlign = {
  score: number;
  gapOpening: number;
  gapExtension: number;
  type: string;
  pattern_align: string;
  subject_align: string;
};

/*
{
  "status": "success",
  "time_secs": 3.2282,
  "data": {
    "score": -4.0365,
    "gapOpening": -2,
    "gapExtension": -1,
    "type": "global",
    "pattern_align": "A--C",
    "subject_align": "AGGC"
  }
}
*/