export type Migration = {
  table: string;
  inserts: string | null;
  version: number;
}[];

export type Migrations = {
  version: number;
  dataMigrations: Migration;
};
