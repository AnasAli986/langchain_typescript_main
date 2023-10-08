
import * as dotenv from 'dotenv'
dotenv.config()
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { VectorDBQAChain } from 'langchain/chains';

import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";



const loader = new PDFLoader("./src/pdf/pdf_langchain.pdf");
const docs = await loader.load();

// Split the pdf file into calculated chunks 
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100, 
    chunkOverlap: 5
});

const output_splitter = await splitter.splitDocuments(docs);

// Create vector store
// const vectorStore = await MemoryVectorStore.fromDocuments(output_splitter, new OpenAIEmbeddings)
const pinecone = new Pinecone();

let pineconeIndex: any; 

// Assert or guard from being undefined 
if(process.env.PINECONE_INDEX) {
    pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX)
}

await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
    pineconeIndex,
});

const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(), 
    {pineconeIndex}
)
// Create open ai chat model to be used 
const chat = new ChatOpenAI({
    temperature: 0.9
})

// Create the chain 
const chain = VectorDBQAChain.fromLLM(
    chat, 
    vectorStore, {
        k:1,
        returnSourceDocuments: true 
    } 
)

const question = `What are dominant sequence transduction models based on? Also provide the 
page number where you found this.`
const res = await chain.call({
    query: question
    
})

console.log(res)


