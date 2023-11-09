import { CleanMarkup } from "$lib/clean";
import { CORE_URL } from "$env/static/private";

export async function load({ request, fetch }) {
    // Extract pathname from the request URL
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Get CORE_URL from environment variables
    const origin = CORE_URL;
    console.log(origin + pathname);

    // Fetch the content from the origin using the pathname
    const response = await fetch(`${origin}${pathname}`);
    const payload = await response.text();

    // Clean the markup using your CleanMarkup function
    const cleanedMarkup = await CleanMarkup(payload);

    // Return the cleaned markup to the page component
    return {
        props: {
            Document: cleanedMarkup
        }
    };
}
