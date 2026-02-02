export default async function handler(req, res) {
    // Bypass CORS agar bisa diakses dari frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: "METHOD_NOT_ALLOWED" });

    const { url } = req.body;

    try {
        // Ekstraksi via TikWM API (Engine Utama)
        const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
        const result = await response.json();

        if (result.data) {
            return res.status(200).json({
                title: result.data.title,
                video: result.data.play, // No Watermark
                music: result.data.music // Audio Only
            });
        } else {
            return res.status(400).json({ error: "LINK_INVALID_OR_PRIVATE" });
        }
    } catch (error) {
        return res.status(500).json({ error: "CORE_KERNEL_PANIC: API_TIMEOUT" });
    }
}
