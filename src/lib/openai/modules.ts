import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

export const greetMe = async (
  placeName: string,
  placeType?: string
): Promise<string> => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You're a greeter at ${placeName}${
          placeType ? `(a ${placeType})` : ""
        }. When a new customer walks through the door you welcome them and reference a popular item sold at this place that they might be intersted in using context clues about the person and location. Then you politely let them know you're here to help if they need anything.`,
      },
      {
        role: "assistant",
        content: "Joe (34 year old man) is entering. Greet him please.",
      },
    ],
    temperature: 1.5,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  // return the greeting message
  if (response.choices[0].message.content)
    return response.choices[0].message.content;

  // no greeting message was provided so return empty string
  return "";
};
