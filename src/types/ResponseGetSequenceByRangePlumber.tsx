export type ResponseGetSequenceByRangePlumber = {
  status: string;
  time_secs: number;
  data: {
    sequence_length: number;
    sequence: string;
    complete: boolean;
  };
};