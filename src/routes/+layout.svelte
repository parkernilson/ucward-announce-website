<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import { site } from '$lib/config';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="mx-auto flex min-h-screen max-w-2xl flex-col px-4">
	<header class="flex items-center justify-between py-6">
		<a href={resolve('/')} class="text-xl font-bold">{site.name}</a>
		<nav class="flex gap-4 text-sm">
			<a href={resolve('/privacy')} class="hover:underline">Privacy</a>
			<a href={resolve('/terms')} class="hover:underline">Terms</a>
		</nav>
	</header>

	<main class="flex-1 pb-12">
		{@render children()}
	</main>

	<footer class="border-t border-gray-200 py-6 text-sm text-gray-500">
		<p class="font-medium text-gray-700">{site.name} is operated by {site.operator}.</p>
		<p class="mt-1">
			{site.name} is a free, non-commercial service for the {site.ward}. Reply STOP to opt out, HELP
			for help. Contact:
			<a href="mailto:{site.contactEmail}" class="underline">{site.contactEmail}</a>
		</p>
	</footer>
</div>
