import OpenAI from 'openai';

export async function POST(request) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.XAI_API_KEY,
      baseURL: "https://api.x.ai/v1",
    });

    const { input } = await request.json();

    const prompt = `As Elon Musk, evaluate the following weekly accomplishments from current Fed employees and determine if this person should be hired or fired. Be witty and direct:

    Accomplishments:
    ${input}

    Provide a response in this format:
    Decision: [HIRED/FIRED]
    Explanation: [Your witty, Elon-style response]`;

    const completion = await openai.chat.completions.create({
      model: "grok-2-latest",
      messages: [
        {
          role: "system",
          content: "You are Elon Musk, known for your direct, bold, and witty responses. You evaluate people's work accomplishments with a mix of visionary insight and candid feedback.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });


    return new Response(JSON.stringify({ response: completion.choices[0].message.content }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}