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
		// Remove event listeners after the first trigger
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('scroll', handleScroll);
	}

	// Function to handle scroll
	function handleScroll() {
		if (isSphereAnimationAvailable()) {
			sphereAnimation();
		}
		// Remove event listeners after the first trigger
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('scroll', handleScroll);
	}

	onMount(() => {
		// Add event listeners to the document for mouse movement and scroll
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('scroll', handleScroll);
	});
</script>

<svelte:head>
	<script defer src="/wp-content/uploads/scripts/anime.min.js"></script>
</svelte:head>

<body>
	<slot />
</body>
