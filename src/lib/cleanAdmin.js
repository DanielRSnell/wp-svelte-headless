// @ts-nocheck
import { parseHTML } from 'linkedom';
import { CORE_URL } from '$env/static/private';

export async function CleanMarkupAdmin(payload) {
  // Parse the HTML content with linkedom
  const { document } = parseHTML(payload);

  // Extract head and body
  const head = document.head.outerHTML;
  const body = document.body.outerHTML;

  // Clean the body markup and perform additional changes
  // Note: Modify this cleaning process as needed
  const cleanedBody = body.replace(/([?&]\w+=\w+)+/g, '').split(CORE_URL).join('');

  // Return both head and body
  return { Head: head, Document: cleanedBody };
}
