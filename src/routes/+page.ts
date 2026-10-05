import QRCode from 'qrcode';
import { qrPayload } from '$lib/config';

export async function load() {
	const svg = await QRCode.toString(qrPayload(), {
		type: 'svg',
		margin: 1,
		errorCorrectionLevel: 'M'
	});
	// A data URL for an <img>, so the page doesn't need {@html}.
	const joinQr = `data:image/svg+xml,${encodeURIComponent(svg)}`;
	return {
		joinQr
	};
}
