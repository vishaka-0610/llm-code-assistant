from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from services.llm_service import generate_code
from services.llm_service import explain_code
from services.llm_service import refactor_code
from services.llm_service import debug_code

from database import SessionLocal
from models import History
from database import engine
from models import Base

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str
    language: str
    
class ExplainRequest(BaseModel):
    code: str

class RefactorRequest(BaseModel):
    code: str
    
class DebugRequest(BaseModel):
    code: str
@app.get("/")
def home():
    return {"message": "LLM Code Assistant Backend Running Successfully"}


@app.post("/refactor")
def refactor(request: RefactorRequest):

    result = refactor_code(request.code)

    return {
        "refactored_code": result
    }
    

    
@app.post("/explain")
def explain(request: ExplainRequest):

    result = explain_code(request.code)

    return {
        "explanation": result
    }
    
@app.post("/debug")
def debug(request: DebugRequest):

    result = debug_code(request.code)

    return {
        "fixed_code": result
    }
    
@app.post("/generate")
def generate(request: PromptRequest):

    result = generate_code(
        request.prompt,
        request.language
    )

    print("Saving to database...")

    db = SessionLocal()

    entry = History(
        prompt=request.prompt,
        response=result,
        language=request.language
    )

    db.add(entry)
    db.commit()

    print("Saved!")

    db.close()

    return {"response": result}
    
@app.get("/history")
def get_history():

    db = SessionLocal()

    history = db.query(History).all()

    result = []

    for item in history:
        result.append({
            "id": item.id,
            "prompt": item.prompt,
            "language": item.language
        })

    db.close()

    return result

@app.delete("/history")
def clear_history():

    db = SessionLocal()

    db.query(History).delete()

    db.commit()
    db.close()

    return {
        "message": "History cleared"
    }