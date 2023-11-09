<script>
	import '../styles/remote-tw.css';
	import { onMount } from 'svelte';

	// Check if the sphereAnimation function exists
	function isSphereAnimationAvailable() {
		return typeof sphereAnimation === 'function';
	}

	// Function to handle mouse movement
	function handleMouseMove() {
		if (isSphereAnimationAvailable()) {
			sphereAnimation();
		}
	}

	onMount(() => {
		// Add event listener to the document for mouse movement
		document.addEventListener('mousemove', handleMouseMove);

		// Optional: Cleanup the event listener when the component is unmounted
		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<svelte:head>
	<script defer src="/wp-content/uploads/scripts/anime.min.js"></script>
</svelte:head>

<body>
	<slot />
</body>
