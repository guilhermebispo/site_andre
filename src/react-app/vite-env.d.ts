/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_PROFILE_TITLE?: string;
	readonly VITE_PROFILE_NAME?: string;
	readonly VITE_EMAIL?: string;
	readonly VITE_PHONE?: string;
	readonly VITE_LINKEDIN_URL?: string;
	readonly VITE_LATTES_URL?: string;
	readonly VITE_GOOGLE_SCHOLAR_URL?: string;
	readonly VITE_ORCID_URL?: string;
	readonly VITE_GITHUB_URL?: string;
	readonly VITE_INSTAGRAM_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface Window {
	__SITE_ENV__?: Partial<Record<string, string>>;
}
