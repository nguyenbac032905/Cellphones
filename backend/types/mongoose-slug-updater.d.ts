declare module "mongoose-slug-updater" {
  import { Schema } from "mongoose";
  interface SlugOptions {
        tmpl?: string;
        alwaysUpdate?: boolean;
        separator?: string;
        truncate?: number;
        lowercase?: boolean;
  }
  function mongooseSlugUpdater(schema: Schema, options?: SlugOptions): void;
  export default mongooseSlugUpdater;
}