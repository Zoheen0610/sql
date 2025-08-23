from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from peft import PeftModel
import torch
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

# Base model used during fine-tuning
base_model_name = "t5-small"
adapter_model = "Shujashark/llm-sql-t5-small-lora-adapter"

# Load base tokenizer
tokenizer = AutoTokenizer.from_pretrained(base_model_name)

# Load base model
base_model = AutoModelForSeq2SeqLM.from_pretrained(base_model_name)

# Apply LoRA adapter weights
model = PeftModel.from_pretrained(base_model, adapter_model)

# input_text = "translate to SQL: List the names and countries of singers who are older than 30.?"
# inputs = tokenizer(input_text, return_tensors="pt")
# outputs = model.generate(**inputs)
# print(tokenizer.decode(outputs[0], skip_special_tokens=True))
 
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)

#FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NLQuery(BaseModel):
    question: str

@app.post("/generate-sql")
def generate_sql(req: NLQuery):
    print("Received request:", req)
    input_text = f"translate to SQL: {req.question}"
    print(input_text)
    
    inputs = tokenizer(input_text, return_tensors="pt", truncation=True, padding=True, max_length=256)
    inputs = {k: v.to(model.device) for k, v in inputs.items()}
    
    outputs = model.generate(**inputs, max_length=128)

    sql_query = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"sql_query": sql_query}

# # test_query = "translate to SQL: List the names and countries of singers who are older than 30.?"
# # input_string = f"{test_query}"

# # inputs = tokenizer(input_string, return_tensors="pt", truncation=True, padding=True, max_length=256)
# # inputs = {k: v.to(model.device) for k, v in inputs.items()}

# # outputs = model.generate(**inputs, max_length=128)
# # generated_sql = tokenizer.decode(outputs[0], skip_special_tokens=True)

# # print("Predicted SQL query:\n", generated_sql)
