import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

app.get("/env.js", (c) => {
	const rawEnv = {
		VITE_PROFILE_TITLE: c.env.VITE_PROFILE_TITLE,
		VITE_PROFILE_NAME: c.env.VITE_PROFILE_NAME,
		VITE_EMAIL: c.env.VITE_EMAIL,
		VITE_PHONE: c.env.VITE_PHONE,
		VITE_LINKEDIN_URL: c.env.VITE_LINKEDIN_URL,
		VITE_LATTES_URL: c.env.VITE_LATTES_URL,
		VITE_GOOGLE_SCHOLAR_URL: c.env.VITE_GOOGLE_SCHOLAR_URL,
		VITE_ORCID_URL: c.env.VITE_ORCID_URL,
		VITE_GITHUB_URL: c.env.VITE_GITHUB_URL,
		VITE_INSTAGRAM_URL: c.env.VITE_INSTAGRAM_URL,
	} satisfies Partial<Record<string, string | undefined>>;

	const serialized = JSON.stringify(
		Object.fromEntries(
			Object.entries(rawEnv).filter(([, value]) => typeof value === "string" && value.trim().length > 0) as [
				string,
				string
			][],
		),
	);

	const body = `window.__SITE_ENV__=Object.assign(window.__SITE_ENV__ ?? {}, ${serialized});`;

	return new Response(body, {
		headers: {
			"content-type": "application/javascript; charset=utf-8",
			"cache-control": "no-store",
		},
	});
});

export default app;
