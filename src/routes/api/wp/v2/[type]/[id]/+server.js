// /src/routes/api/core/[type]/+server.js
import { json } from '@sveltejs/kit';
import { CORE_URL } from "$env/static/private";

export async function GET({ params, url }) {
  const { id, type } = params;
  const coreUrl = `${CORE_URL}/wp-json/wp/v2/${type}/${id}`;

  try {
    const response = await fetch(`${coreUrl}${url.search}`);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=3600'
       }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
