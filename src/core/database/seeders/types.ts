import type { db as dbType } from "~/core/database";

export interface SeederOptions {
  count?: number;
  db: typeof dbType;
}

export type SeedFunction = () => Promise<void>;
export type SeederFactory = (options: SeederOptions) => {
  seed: SeedFunction;
  name: string;
};
