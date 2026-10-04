import QRCode from "qrcode"
import { qrPayload, site } from "$lib/config"

export async function load() {
    const joinQr = await QRCode.toString(qrPayload(), { type: 'svg', margin: 1, errorCorrectionLevel: 'M' })
    return {
        joinQr
    }
}