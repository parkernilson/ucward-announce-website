import QRCode from 'qrcode';
import { qrPayload } from '$lib/config';

export async function load() {
	const joinQr = await QRCode.toString(qrPayload(), {
		type: 'svg',
		margin: 1,
		errorCorrectionLevel: 'M'
	});
	return {
		joinQr
	};
}
