export async function load({ fetch, params }) {
    console.log(params);
    // Extract pathname from the request URL
    const { slug } = params;
    
    // Fetch the content from the origin using the pathname
    const response = await fetch(`/api/markup?pathname=${slug}`);

    // Check if the response is OK
    if (!response.ok) {
        // Handle error, e.g., by returning an error message or status
        return { error: 'Failed to fetch content', status: response.status };
    }

    // Extract the JSON payload from the response
    const payload = await response.json();

    // Return the payload directly as a plain object
    return payload;
}

export const ssr = 'always';
