import { PromptTemplate } from 'langchain/prompts';
import { ChatPromptTemplate } from 'langchain/prompts';
import dotenv from 'dotenv'

import { BaseOutputParser } from 'langchain/schema/output_parser'
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
//         input_language: "English",
//         output_language: "French",
//         text: "I love programming"
//     })

//     console.log(formattedChatPrompt.at(0))
// }

// work();

// -------------------------------- CHAT PROMPTS COMPLETED ----------------------------

class CommaSeparatedListOutputParser extends BaseOutputParser<string[]> {
    async parse(text: string): Promise<string[]> {
        return text.split(",").map((item) => item.trim())
    }
}

const parser = new CommaSeparatedListOutputParser();

const result = await parser.parse("hi, bye");

console.log(result);