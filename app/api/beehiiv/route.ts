export async function POST(request: Request) {
  const beehiivURL =
    process.env.NODE_ENV === "production"
      ? "https://api.beehiiv.com/v2"
      : "https://stoplight.io/mocks/beehiiv/v2/104190750";

  const apiKey = process.env.BEEHIV_API_KEY;
  if (!apiKey) {
    return new Response("BEEHIV_API_KEY not set", { status: 500 });
  }

  const { email } = await request.json();
  if (!email) {
    return new Response("email not set", { status: 400 });
  }

  const res = await fetch(
    `${beehiivURL}/publications/${process.env.BEEHIV_PUBLICATION_ID}/subscriptions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ email }),
    }
  );
  const data = await res.json();
  return Response.json({ data }, { status: 200 });
}
