<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import {
		site,
		smsLink,
		posterDisclosure,
		joinConfirmation,
	} from '$lib/config';


	const { data } = $props()

</script>

<svelte:head>
	<title>{site.name} — Ward announcements by text message</title>
	<meta
		name="description"
		content="{site.name}: free text message announcements and reminders for the {site.ward}. Text JOIN to {site.phoneNumber} to sign up; reply STOP to opt out."
	/>
</svelte:head>

<h1 class="mb-4 text-3xl font-bold">Ward announcements by text message</h1>
<p class="mb-8 text-lg text-gray-700">
	{site.name} is a free SMS service that sends announcements of upcoming events to members and friends of the
	{site.ward} who sign up.
</p>

<section class="flex flex-col items-center mb-8 rounded-lg border border-gray-200 p-6">
	<div class="w-48 sm:w-64 [&>svg]:h-auto [&>svg]:w-full" aria-label="QR code to text JOIN">
		{@html data.joinQr}
	</div>
	<p class="text-center">UC Ward: {posterDisclosure()}</p>
	<p>Privacy Policy: <a class="text-blue-600 hover:text-blue-800" href={resolve("/privacy")}>{page.url.origin}{resolve("/privacy")}</a></p>
	<p>Terms of Service: <a class="text-blue-600 hover:text-blue-800" href={resolve("/terms")}>{page.url.origin}{resolve("/terms")}</a></p>
</section>
