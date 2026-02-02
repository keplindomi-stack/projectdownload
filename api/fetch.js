export default async function handler(req, res) {
    // Header Keamanan & CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method !== 'POST') {
        return res.status(405).json({ error: "METHOD_NOT_ALLOWED" });
    }

    const { url } = req.body;

    try {
        // Menggunakan fetch bawaan (Tanpa Axios)
        const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
        const result = await response.json();

        if (result.data) {
            return res.status(200).json({
                title: result.data.title,
                video: result.data.play,
                music: result.data.music
            });
        } else {
            return res.status(400).json({ error: "INVALID_URL_OR_DATA" });
        }
    } catch (error) {
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
}
