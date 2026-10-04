<script lang="ts">
	import { resolve } from '$app/paths';
	import {
		site,
		joinText,
		smsLink,
		posterDisclosure,
		joinConfirmation,
		channelPrefix
	} from '$lib/config';
</script>

<svelte:head>
	<title>{site.name} — Ward announcements by text message</title>
	<meta
		name="description"
		content="{site.name}: free text message announcements and reminders for the {site.ward}. Text {joinText()} to {site.phoneNumber} to sign up; reply STOP to opt out."
	/>
</svelte:head>

<h1 class="mb-4 text-3xl font-bold">Ward announcements by text message</h1>
<p class="mb-8 text-lg text-gray-700">
	{site.name} is a free SMS service that sends announcements and reminders to members and friends of the
	{site.ward} who sign up. No ads, no marketing, no cost.
</p>

<section class="mb-8 rounded-lg border border-gray-200 p-6">
	<h2 class="mb-3 text-xl font-semibold">How to sign up</h2>
	<ol class="mb-4 list-decimal space-y-2 pl-5">
		<li>
			Scan the QR code on a {site.name} poster with your phone's camera. It opens your messaging app with
			a text to <strong>{site.phoneNumber}</strong> already filled in.
		</li>
		<li>
			Send the text. A plain <strong>{joinText()}</strong> joins the default
			<strong>{site.defaultChannel}</strong> channel; some posters are for other channels and fill
			in
			<strong>{site.joinKeyword}</strong> followed by that channel's name (for example,
			<strong>{site.joinKeyword} RS</strong>).
		</li>
		<li>
			You'll get one reply confirming you're subscribed, and then announcements for that channel.
		</li>
	</ol>
	<p class="mb-4">
		No poster handy? Text <strong>{joinText()}</strong> to <strong>{site.phoneNumber}</strong>, or
		on your phone,
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external sms: link, not a route -->
		<a href={smsLink()} class="underline">tap here to start the text</a>.
	</p>
	<p class="mb-4 text-sm text-gray-600">
		Nothing is sent to you unless you text {site.joinKeyword} first. See our
		<a href={resolve('/terms')} class="underline">Terms and Conditions</a> and
		<a href={resolve('/privacy')} class="underline">Privacy Policy</a>.
	</p>

	<h3 class="mb-2 font-semibold">Disclosure printed on every poster, next to the QR code</h3>
	<blockquote class="mb-4 border-l-4 border-gray-300 pl-4 text-sm text-gray-700">
		{posterDisclosure()}
	</blockquote>

	<h3 class="mb-2 font-semibold">Confirmation text you'll receive</h3>
	<blockquote class="border-l-4 border-gray-300 pl-4 text-sm text-gray-700">
		{joinConfirmation()}
	</blockquote>
</section>

<section class="mb-8">
	<h2 class="mb-3 text-xl font-semibold">Channels</h2>
	<p>
		Announcements are organized into channels, and you can be in more than one. Text
		<strong>{site.joinKeyword} &lt;channel&gt;</strong> to join a channel and
		<strong>{site.leaveKeyword} &lt;channel&gt;</strong> to leave it (for example,
		<strong>{site.leaveKeyword} {site.defaultChannel}</strong>). Each announcement starts with the
		channel it's for, like "{channelPrefix(site.defaultChannel)}:". The channels are:
	</p>
	<ul class="mt-2 list-disc space-y-1 pl-5">
		{#each site.channels as channel (channel.code)}
			<li>
				<strong>{channel.code}</strong> — {channel.name}{channel.code === 'ALL'
					? ' (announcements that apply to everyone)'
					: ''}
			</li>
		{/each}
	</ul>
</section>

<section>
	<h2 class="mb-3 text-xl font-semibold">How to stop</h2>
	<p>
		Reply <strong>STOP</strong> to any message to unsubscribe from every channel immediately. You'll
		receive one final confirmation message and no further texts. Changed your mind? Reply
		<strong>START</strong> to opt back in.
	</p>
</section>
