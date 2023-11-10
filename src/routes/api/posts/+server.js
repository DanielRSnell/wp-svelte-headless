// src/routes/api/posts/+server.js
import { json } from '@sveltejs/kit';
import { CORE_URL } from "$env/static/private";

async function fetchGraphQLData() {
    // Define the GraphQL query
    const query = `
        query NewQuery {
            posts {
                edges {
                    node {
                        id
                        slug
                        title
                        content(format: RENDERED)
                        categories {
                            edges {
                                node {
                                    name
                                }
                            }
                        }
                    }
                }
            }
        }`;

    // Determine the appropriate URL based on the environment
    const graphqlEndpoint = typeof window === 'undefined' && CORE_URL ? CORE_URL + '/graphql' : '/graphql';

    try {
        // Send the POST request to the GraphQL endpoint
        const response = await fetch(graphqlEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        // Process the response
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function GET() {
    try {
        // Fetch the data using the internal function
        const result = await fetchGraphQLData();

        // Return the GraphQL query results
        return json(result);
    } catch (error) {
        // Handle network or other errors
        return json({ error: error.message }, { status: 500 });
    }
}

export const prerender = true;
