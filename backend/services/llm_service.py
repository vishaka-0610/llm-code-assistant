from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def generate_code(prompt, language):

    full_prompt = f"""
Generate {language} code for:
{prompt}

Return only code.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": full_prompt
            }
        ]
    )

    return response.choices[0].message.content

def explain_code(code):

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": f"Explain this code:\n\n{code}"
            }
        ]
    )

    return response.choices[0].message.content

def refactor_code(code):

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": f"Refactor and improve this code:\n\n{code}\n\nReturn only code."
            }
        ]
    )

    return response.choices[0].message.content

def debug_code(code):

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": f"""
Find bugs in this code and return the corrected version.

Code:
{code}

Return only corrected code.
"""
            }
        ]
    )

    return response.choices[0].message.content