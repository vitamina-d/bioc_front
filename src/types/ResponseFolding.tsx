type JobStatus = "pending" | "running" | "failed" | "completed";

export type ResponseStatus = {
  jobId: string,
  status: JobStatus;
};

export type ResponseRanks = {
  prot1: ProteinRanks;
}

export type ProteinRanks = Record<string, number>;