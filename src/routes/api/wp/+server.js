// /src/routes/api/+server.js
import { json } from '@sveltejs/kit';
import { CORE_URL } from "$env/static/private";


export async function GET({ url }) {
  const coreUrl = `${CORE_URL}/wp-json`;

  try {
    const response = await fetch(`${coreUrl}`);
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
