import { PromptTemplate, SystemMessagePromptTemplate } from "langchain/prompts";
import { SqlDatabase } from "langchain/sql_db";
import { DataSource } from "typeorm";
import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { SqlDatabaseChain } from "langchain/chains/sql_db";
import dotenv from 'dotenv'
dotenv.config()


const defaultPrompt =`Your an AI Assistant to perform the database operations like a Database Administrator.
Given an input question, first create a syntactically correct sql query to run.
then look at the results of the query and return the answer.
Provide the results in the form of table.
Please provide the query that you are running.
The question: {question}`

const db_name= "Employee"
const db_user= ""
const db_password= ""
const db_host= ""

const run = async () => {
    const datasource = await new DataSource({
        type: "mysql",
        // database: "Employee",
        // username: "mladmin",
        // password: "mlangles",
        // host: "54.196.58.2",
        url: `mysql://${db_user}:${db_password}@${db_host}/${db_name}`,
        connectTimeout: 20000,
    })
    // const rawData = await datasource.query(`SELECT * FROM Employees_Data`)
    // console.log(rawData)

    const db = await SqlDatabase.fromDataSourceParams({
        appDataSource: datasource,
    })

    const model = new ChatOpenAI({modelName:'gpt-4'})
    const chain = new SqlDatabaseChain({
        llm: model,
        database: db,
    })

    const template = PromptTemplate.fromTemplate(defaultPrompt);
    const text : string = await template.format({
         question: "List all the employye details of employees who have salary more than $130k"
    })
    const res = await chain.call({
        query: text
    })

    console.log({res});
    await datasource.destroy()
}

run()