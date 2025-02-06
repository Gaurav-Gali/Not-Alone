export async function POST(req: Request) {
    const { prompt }: { prompt: string } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
        return Response.json({ error: "API key is missing" }, { status: 500 });
    }

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                }),
            }
        );

        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        return Response.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
