import "@cloudflare/workers-types";

declare global {
  interface Env {
    DB: D1Database;
    R2_BUCKET: R2Bucket;

    VITE_PROFILE_TITLE?: string;
    VITE_PROFILE_NAME?: string;
    VITE_EMAIL?: string;
    VITE_PHONE?: string;
    VITE_LINKEDIN_URL?: string;
    VITE_LATTES_URL?: string;
    VITE_GOOGLE_SCHOLAR_URL?: string;
    VITE_ORCID_URL?: string;
    VITE_GITHUB_URL?: string;
    VITE_INSTAGRAM_URL?: string;
  }
}

export {};
