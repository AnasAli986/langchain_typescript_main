import { OpenAI } from "langchain/llms/openai";

import dotenv from 'dotenv';
dotenv.config();

const llm = new OpenAI({
    temperature: 0.7
})

let res = await llm.call("Hi how are you")
let res2 = await llm.generate(["Hello, whats up?", "What is 1+1"])
console.log(res2.llmOutput);