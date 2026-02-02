const axios = require('axios');

export default async function handler(req, res) {
    const { url } = req.body;

    try {
        // Menggunakan API pihak ketiga (Contoh: TikWM - Gratis & Populer)
        const response = await axios.get(`https://www.tikwm.com/api/?url=${url}`);
        const data = response.data.data;

        res.status(200).json({
            title: data.title,
            cover: data.cover,
            video: data.play, // Video No Watermark
            music: data.music, // Link MP3
            wm_video: data.wmplay // Video With Watermark (opsional)
        });
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil data dari server." });
    }
}
