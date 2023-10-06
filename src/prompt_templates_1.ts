import { PromptTemplate } from 'langchain/prompts';
import dotenv from 'dotenv'

dotenv.config();

const prompt = PromptTemplate.fromTemplate(
    `
    What is a good name for a company that makes {product}?
    `
)

async function work() {
    const formattedPrompt = await prompt.format({
        product: "colorful socks"
    })

    console.log(formattedPrompt);
}

work();