const axios = require('axios');

export default async function handler(req, res) {
    // Izinkan akses dari frontend kamu
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL_NULL_EXCEPTION" });
    }

    try {
        // Menggunakan endpoint API yang lebih responsif
        const response = await axios.get(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
        
        if (response.data && response.data.data) {
            const data = response.data.data;
            return res.status(200).json({
                title: data.title || "NO_TITLE",
                video: data.play, 
                music: data.music
            });
        } else {
            return res.status(500).json({ error: "DATA_EXTRACTION_FAILED" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "CORE_KERNEL_PANIC" });
    }
}
