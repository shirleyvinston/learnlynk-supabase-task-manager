export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      "https://jywxpaaoyrnpvkaxmjmm.supabase.co/functions/v1/create-task",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: response.status });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}