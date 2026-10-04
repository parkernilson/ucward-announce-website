<script lang="ts">
	import { resolve } from '$app/paths';
	import { site, joinText, channelPrefix } from '$lib/config';
</script>

<svelte:head>
	<title>Terms and Conditions — {site.name}</title>
	<meta
		name="description"
		content="Terms for {site.name} text messages: how to opt in, message frequency, costs, and how to opt out."
	/>
</svelte:head>

<article class="space-y-4">
	<h1 class="text-3xl font-bold">Terms and Conditions</h1>
	<p class="text-sm text-gray-500">Last updated: {site.lastUpdated}</p>

	<h2 class="pt-2 text-xl font-semibold">The service</h2>
	<p>
		{site.name} is a free, non-commercial SMS service operated personally by {site.operator} that sends
		announcements and reminders to members and friends of the {site.ward}. It does not send
		advertising or marketing messages and is not paid for by anyone.
	</p>

	<h2 class="pt-2 text-xl font-semibold">Opting in</h2>
	<p>
		You opt in by texting <strong>{site.joinKeyword}</strong> to {site.phoneNumber}, usually by
		scanning the QR code on a {site.name} poster, which opens your messaging app with the text filled
		in. Each poster shows these disclosures next to the code, and the same wording is on our
		<a href={resolve('/')} class="underline">home page</a>. A plain <strong>{joinText()}</strong>
		joins the default <strong>{site.defaultChannel}</strong> channel;
		<strong>{site.joinKeyword}</strong> followed by a channel name (for example,
		<strong>{site.joinKeyword} RS</strong>) joins that channel. The channels are {site.channels
			.map((c) => `${c.code} (${c.name})`)
			.join(', ')}. We reply once to confirm, and then send recurring announcement and reminder
		messages for each channel you joined. We never text a number that hasn't texted {site.joinKeyword}.
		Consent is not a condition of any purchase.
	</p>

	<h2 class="pt-2 text-xl font-semibold">Message frequency and cost</h2>
	<p>
		Message frequency varies. Each message is labeled with its channel, for example "{channelPrefix(
			site.defaultChannel
		)}:". {site.name} is free, but message and data rates may apply according to your mobile plan.
	</p>

	<h2 class="pt-2 text-xl font-semibold">Opting out</h2>
	<p>
		Text <strong>{site.leaveKeyword}</strong> followed by a channel name (for example,
		<strong>{site.leaveKeyword} {site.defaultChannel}</strong>) to leave that channel. Reply
		<strong>STOP</strong> to any message at any time to leave every channel. You will receive one
		confirmation message and no further messages. To opt back in, reply <strong>START</strong>.
	</p>

	<h2 class="pt-2 text-xl font-semibold">Help</h2>
	<p>
		Reply <strong>HELP</strong> for help, or email
		<a href="mailto:{site.contactEmail}" class="underline">{site.contactEmail}</a>.
	</p>

	<h2 class="pt-2 text-xl font-semibold">Disclaimers</h2>
	<p>
		Carriers are not liable for delayed or undelivered messages. The service is provided "as is" and
		may be changed or discontinued at any time.
	</p>

	<h2 class="pt-2 text-xl font-semibold">Privacy</h2>
	<p>
		See our <a href={resolve('/privacy')} class="underline">Privacy Policy</a> for how your information
		is handled.
	</p>
</article>
