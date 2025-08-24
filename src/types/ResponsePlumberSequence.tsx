export type ResponsePlumberSequence = {
  status: string;
  time_secs: number;
  data: DataPlumberSequence;
};

export type DataPlumberSequence = {
  complete: boolean;
  sequence_length: number;
  sequence: string;
};
