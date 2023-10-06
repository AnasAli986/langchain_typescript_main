
import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import dotenv from 'dotenv'

dotenv.config();

const llm = new OpenAI({
  temperature: 0.9,
});

const chatModel = new ChatOpenAI();

const text = "What would be a good company name for a company that makes colorful socks?";

async function prediction() {
    const llmResult = await llm.predict(text);
    const chatModelResult = await chatModel.predict(text);

    console.log("LLM result: ", llmResult);
    console.log("Chat Model Result: ", chatModelResult);
}

prediction()