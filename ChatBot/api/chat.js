const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing GEMINI_API_KEY on server' })
  }

  try {
    // Vercel may provide req.body as an object (parsed) or a string; normalize it.
    let body = req.body
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body)
      } catch {
        // If it's not JSON, keep as-is and let the downstream API fail.
      }
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${AIzaSyCTfCc8YzSpcTzfqKUTeMhmIkMEtZeRYCA}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    )

    let data
    try {
      data = await response.json()
    } catch {
      data = { error: 'Gemini returned non-JSON response' }
    }

    if (!response.ok) {
      console.error('Gemini API error:', { status: response.status, data })
    }

    return res.status(response.status).json(data)
  } catch (error) {
    console.error('Function error:', error)
    return res.status(500).json({
      error: 'Failed to reach Gemini API',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export default handler
// Compatibility: some Vercel setups expect CommonJS exports.
if (typeof module !== 'undefined' && module?.exports) {
  module.exports = handler
}
