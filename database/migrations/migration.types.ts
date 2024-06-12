type Query = {
  query: string;
};

export type Migration = {
  version: number;
  queries: Query[];
};
