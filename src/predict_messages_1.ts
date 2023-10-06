import { HumanMessage } from 'langchain/schema';
import { OpenAI } from 'langchain/llms/openai';

const llm = new OpenAI({
    temperature: 0.7
})
const text = "What would be a good company name for a company that makes colorful socks?";

const messages = [new HumanMessage({content: text})];

async function predictions() {
    const llmResult = await llm.predictMessages(messages);
    console.log(llmResult)
}

predictions();