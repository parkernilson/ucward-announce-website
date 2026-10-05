<script lang="ts">
	import { resolve } from '$app/paths';
	import { site } from '$lib/config';
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
		public announcements and alerts about upcoming events to members and friends of the {site.ward}.
		It does not send advertising or marketing messages and is not paid for by anyone.
	</p>

	<h2 class="pt-2 text-xl font-semibold">Opting in</h2>
	<p>
		You opt in by scanning the QR code on a {site.name} poster, which opens your messaging app with a
		message of <strong>{site.joinKeyword}</strong> addressed to {site.phoneNumber}, and sending that
		message. You can also text <strong>{site.joinKeyword}</strong> to {site.phoneNumber} directly. Each
		poster shows the program disclosures next to the code, and the same QR code and wording are on our
		<a href={resolve('/')} class="underline">home page</a>. We reply once to confirm your
		subscription, and then send recurring announcement messages. We never text a number that hasn't
		texted
		{site.joinKeyword}. Consent is not a condition of any purchase.
	</p>

	<h2 class="pt-2 text-xl font-semibold">Message frequency and cost</h2>
	<p>
		Message frequency varies. Every message begins with "{site.smsPrefix}:". {site.name} is free, but
		message and data rates may apply according to your mobile plan.
	</p>

	<h2 class="pt-2 text-xl font-semibold">Opting out</h2>
	<p>
		Reply <strong>STOP</strong> to any message at any time to unsubscribe. You will receive one
		confirmation message and no further messages. To subscribe again, reply
		<strong>START</strong>.
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
