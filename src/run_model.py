from langchain.llms import HuggingFacePipeline
from langchain import PromptTemplate
from timer import Timer
from langchain.chains import LLMChain

model_id = "lmsys/fastchat-t5-3b-v1.0"
llm = HuggingFacePipeline.from_model_id(
    model_id=model_id,
    task="text2text-generation",
    model_kwargs={"temperature": 0, "max_length": 1000},
)

template = """
You are a friendly chatbot assistant that responds conversationally to users' questions.
Keep the answers short, unless specifically asked by the user to elaborate on something.

Question: {question}

Answer:"""

prompt = PromptTemplate(template=template, input_variables=["question"])

llm_chain = LLMChain(prompt=prompt, llm=llm)


def ask_question(question):
    result = llm_chain(question)
    print(result['question'])
    print("")
    print(result['text'])


with Timer():
    ask_question("Describe some famous landmarks in London")
