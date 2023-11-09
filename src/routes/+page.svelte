<script>
	export let data;
	const { Document } = data.props;

	import { documentStore } from '$lib/documentStore';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	documentStore.set(Document);

	// Fetch document content and update the store
	/**
	 * @param {RequestInfo | URL} url
	 */
	async function fetchDocument(url) {
		const res = await fetch(url);
		if (res.ok) {
			const text = await res.text();
			documentStore.set(text);
		}
	}

	// Run on client-side after the component is mounted
	onMount(() => {
		if (browser) {
			// Fetch initial content
			// fetchDocument(window.location.pathname);

			// Listen for route changes
			window.addEventListener('popstate', () => {
				// fetchDocument(window.location.pathname);
			});
		}
	});
</script>

{@html $documentStore}
