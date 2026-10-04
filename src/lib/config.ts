// Site-wide details shown on the landing page, privacy policy, and terms.
export const site = {
	name: 'UC Ward Announcements',
	// Prefix on every outgoing text. Channel messages add the channel: "UC Ward (EQ): <message>".
	smsPrefix: 'UC Ward',
	ward: 'University City Ward (San Diego) of The Church of Jesus Christ of Latter-day Saints',
	// Operator's full legal name; the footer's "operated by" line links it to the brand.
	operator: 'Parker Todd Nilson',
	url: 'shout.parkernilson.dev',
	// Toll-free SMS origination number (AWS End User Messaging, two-way enabled).
	phoneNumber: '+1 (844) 493-3651',
	phoneNumberE164: '+18444933651',
	contactEmail: 'parker.todd.nilson@gmail.com',
	joinKeyword: 'JOIN',
	leaveKeyword: 'LEAVE',
	// Channels people can join by texting JOIN <code>. Keep in sync with the channels table in shout-cdk.
	channels: [
		{ code: 'ALL', name: 'Whole ward' },
		{ code: 'EQ', name: 'Elders Quorum' },
		{ code: 'RS', name: 'Relief Society' },
		{ code: 'YM', name: 'Young Men' },
		{ code: 'YW', name: 'Young Women' },
		{ code: 'PR', name: 'Primary' },
		{ code: 'NR', name: 'Nursery' }
	],
	// Channel joined by a bare "JOIN" (and left by a bare "LEAVE").
	defaultChannel: 'EQ',
	lastUpdated: 'October 4, 2026'
};

// Prefix for a channel's messages, e.g. "UC Ward (EQ)".
export function channelPrefix(channel: string): string {
	return `${site.smsPrefix} (${channel})`;
}

// The text a person sends to join. With no channel it's just "JOIN" (the default channel).
export function joinText(channel?: string): string {
	return channel ? `${site.joinKeyword} ${channel}` : site.joinKeyword;
}

// Content of the QR code on a poster: opens the phone's messaging app with the join text filled in.
export function qrPayload(channel?: string): string {
	return `SMSTO:${site.phoneNumberE164}:${joinText(channel)}`;
}

// Same thing as a link, for tapping on a phone. "?&body=" works on both iOS and Android.
export function smsLink(channel?: string): string {
	return `sms:${site.phoneNumberE164}?&body=${encodeURIComponent(joinText(channel))}`;
}

// Disclosure printed on every QR code poster, next to the code. It is what AWS reviews as the
// opt-in workflow, so keep it in sync with the printed posters and the toll-free registration.
export function posterDisclosure(channel?: string): string {
	return `Scan the QR code to text ${joinText(channel)} to ${site.phoneNumber} and get ${site.name}: recurring text messages with announcements and reminders for the ${site.ward}, sent by ${site.operator}. Each message is labeled with its channel. Message frequency varies. Message and data rates may apply. Text HELP for help, ${site.leaveKeyword} ${channel ?? site.defaultChannel} to leave this channel, or STOP to opt out of all messages at any time. Consent is not a condition of any purchase. Terms: ${site.url}/terms. Privacy: ${site.url}/privacy.`;
}

// Reply sent after someone texts JOIN. MUST match `joined` in shout-cdk's
// lambda/shared/messages.ts and the AWS toll-free registration. Change them together.
export function joinConfirmation(channel: string = site.defaultChannel): string {
	return `${channelPrefix(channel)}: You're subscribed to ${channel} announcements from ${site.name}. Msg frequency varies. Msg & data rates may apply. Reply HELP for help, LEAVE ${channel} to leave, STOP to opt out of all.`;
}
