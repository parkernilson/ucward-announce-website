// Site-wide details shown on the landing page, privacy policy, and terms.
export const site = {
	name: 'UC Ward Announcements',
	// Prefix on every outgoing text: "UC Ward: <message>".
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
	lastUpdated: 'October 4, 2026',
};

// Content of the QR code on a poster: opens the phone's messaging app with the join text filled in.
export function qrPayload(): string {
	return `SMSTO:${site.phoneNumberE164}:JOIN`;
}

// Same thing as a link, for tapping on a phone. "?&body=" works on both iOS and Android.
export function smsLink(): string {
	return `sms:${site.phoneNumberE164}?&body=JOIN`;
}

// Disclosure printed on every QR code poster, next to the code. It is what AWS reviews as the
// opt-in workflow, so keep it in sync with the printed posters and the toll-free registration.
export function posterDisclosure(): string {
	return `Scan to receive ${site.name} text messages, including public announcements and alerts. Message frequency may vary. Message and data rates may apply. Reply HELP for help or STOP to opt-out.`;
}

// Reply sent after someone texts JOIN. MUST match `joined` in shout-cdk's
// lambda/shared/messages.ts and the AWS toll-free registration. Change them together.
export function joinConfirmation(): string {
	return `UC Ward: You're subscribed to announcements from ${site.name}. Msg frequency varies. Msg & data rates may apply. Reply HELP for help, STOP to opt out.`;
}
