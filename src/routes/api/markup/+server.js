// src/routes/api/markup/+server.js
import { json } from '@sveltejs/kit';
import { CleanMarkup } from "$lib/clean";
import { CORE_URL } from "$env/static/private";

export async function GET(event) {
    // Extract the pathname from the query parameter
    const pathname = event.url.searchParams.get("pathname");

    // Construct the full URL
    const buildUrl = pathname !== undefined ? new URL(pathname, CORE_URL).href : CORE_URL;

    try {
        // Fetch the content from the URL
        const response = await fetch(buildUrl);
        if (!response.ok) {
            return json({ error: "Failed to fetch content" }, { status: response.status });
        }

        // Process the fetched content
        const payload = await response.text();
        const cleanedMarkup = await CleanMarkup(payload);

        // Return the cleaned markup
        return json({ Document: cleanedMarkup });
    } catch (error) {
        // Handle network or other errors
        return json({ error: "An error occurred while fetching content" }, { status: 500 });
    }
}
