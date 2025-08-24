export type ResponsePlumberDetail = {
  status: string;
  time_secs: number;
  data: DataPlumberDetail;
};

export type DataPlumberDetail = {
  entrezID: string;
  symbol: string;
  type: string;
  location: LocationPlumberDetail;
  ensembl_id_gene: string;
  ensembl_id_protein: string;
  uniprot_ids: string[];
};

type LocationPlumberDetail = {
  citogenetic: string;
  strand: string;
  chr: string;
  start: number;
  end: number;
  length: number;
};
/*
{
  "status": "success",
  "time_secs": 6.1427,
  "data": {
    "entrezID": "1717",
    "symbol": "DHCR7",
    "type": "protein-coding",
    "location": {
      "citogenetic": "11q13.4",
      "strand": "-",
      "chr": "chr11",
      "start": 71428193,
      "end": 71452868,
      "length": 24676
    },
    "ensembl_id_gene": "ENSG00000172893",
    "ensembl_id_protein": null,
    "uniprot_ids": []
  }
}
*/