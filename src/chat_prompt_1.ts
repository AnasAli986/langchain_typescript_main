import { PromptTemplate } from 'langchain/prompts';
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatPromptTemplate } from "langchain/prompts";
import { CommaSeparatedListOutputParser } from "langchain/output_parsers";
import dotenv from 'dotenv'

dotenv.config();

// const template = `
//     You are a helpful assistant that translates {input_language}
//     to {output_language}
// `;

// const humanTemplate = `{text}`;

// const chatPrompt = ChatPromptTemplate.fromMessages([
//     ["system", template],
//     ["human", humanTemplate]
// ]);


// async function work() {
//     const formattedChatPrompt = await chatPrompt.formatMessages({
//         input_language: "English", // Partial variable
//         output_language: "French", // Partial variable 
//         text: "I love programming"
//     })

//     console.log(formattedChatPrompt.at(0))
// }

// work();

// -------------------------------- CHAT PROMPTS COMPLETED ----------------------------

// class CommaSeparatedListOutputParser extends BaseOutputParser<string[]> {
//     async parse(text: string): Promise<string[]> {
//         return text.split(",").map((item) => item.trim())
//     }
// }

// const parser = new CommaSeparatedListOutputParser();

// const result = await parser.parse("hi, bye");

// console.log(result);







const template = `
    You are a helpful assistant that translates {input_language} to {output_language}
`;

const humanText = `{text}`;

const chatPrompt = ChatPromptTemplate.fromMessages([
    ["system", template],
    ["human", humanText]
])

const model = new ChatOpenAI({});
const parser = new CommaSeparatedListOutputParser();

// Yo whats going on here
const chain = chatPrompt.pipe(model).pipe(parser);

const result = await chain.invoke({
    input_language: "English",
    output_language: "Japanese",
    text: "Naruto"
})

console.log(result);
