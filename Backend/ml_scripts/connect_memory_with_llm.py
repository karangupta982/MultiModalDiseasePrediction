# import os

# from langchain_huggingface import HuggingFaceEndpoint
# from langchain_core.prompts import PromptTemplate
# from langchain.chains import RetrievalQA
# from langchain_huggingface import HuggingFaceEmbeddings
# from langchain_community.vectorstores import FAISS

# ## Uncomment the following files if you're not using pipenv as your virtual environment manager
# #from dotenv import load_dotenv, find_dotenv
# #load_dotenv(find_dotenv())


# # Step 1: Setup LLM (Mistral with HuggingFace)
# HF_TOKEN = os.environ.get("HF_TOKEN")
# HUGGINGFACE_REPO_ID = "mistralai/Mistral-7B-Instruct-v0.3"

# def load_llm(huggingface_repo_id):
#     llm=HuggingFaceEndpoint(
#         repo_id=huggingface_repo_id,
#         temperature=0.5,
#         model_kwargs={"token":HF_TOKEN,
#                       "max_length":"512"}
#     )
#     return llm

# # Step 2: Connect LLM with FAISS and Create chain

# CUSTOM_PROMPT_TEMPLATE = """
# Use the pieces of information provided in the context to answer user's question.
# If you dont know the answer, just say that you dont know, dont try to make up an answer. 
# Dont provide anything out of the given context

# Context: {context}
# Question: {question}

# Start the answer directly. No small talk please.
# """

# def set_custom_prompt(custom_prompt_template):
#     prompt=PromptTemplate(template=custom_prompt_template, input_variables=["context", "question"])
#     return prompt

# # Load Database
# DB_FAISS_PATH="vectorstore/db_faiss"
# embedding_model=HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
# db=FAISS.load_local(DB_FAISS_PATH, embedding_model, allow_dangerous_deserialization=True)

# # Create QA chain
# qa_chain=RetrievalQA.from_chain_type(
#     llm=load_llm(HUGGINGFACE_REPO_ID),
#     chain_type="stuff",
#     retriever=db.as_retriever(search_kwargs={'k':3}), #model will take 3 most relevant documents while fetching relevent answer from different chunks
#     return_source_documents=True,
#     chain_type_kwargs={'prompt':set_custom_prompt(CUSTOM_PROMPT_TEMPLATE)}
# )

# # Now invoke with a single query
# user_query=input("Write Query Here: ")
# response=qa_chain.invoke({'query': user_query})
# print("RESULT: ", response["result"])
# print("SOURCE DOCUMENTS: ", response["source_documents"])














# -----------


# import os
# import json
# from flask import Flask, request, jsonify
# from langchain_huggingface import HuggingFaceEndpoint
# from langchain_core.prompts import PromptTemplate
# from langchain.chains import RetrievalQA
# from langchain_huggingface import HuggingFaceEmbeddings
# from langchain_community.vectorstores import FAISS

# # Load environment variables
# HF_TOKEN = os.environ.get("HF_TOKEN")
# HUGGINGFACE_REPO_ID = "mistralai/Mistral-7B-Instruct-v0.3"

# # Initialize Flask app
# app = Flask(__name__)

# def load_llm(huggingface_repo_id):
#     return HuggingFaceEndpoint(
#         repo_id=huggingface_repo_id,
#         temperature=0.5,
#         model_kwargs={"token": HF_TOKEN, "max_length": "512"}
#     )

# # Define the custom prompt template
# CUSTOM_PROMPT_TEMPLATE = """
# Use the pieces of information provided in the context to answer the user's question.
# If you don't know the answer, just say that you don't know. Don't try to make up an answer.
# Don't provide anything out of the given context.

# Context: {context}
# Question: {question}

# Start the answer directly. No small talk please.
# """

# def set_custom_prompt(custom_prompt_template):
#     return PromptTemplate(template=custom_prompt_template, input_variables=["context", "question"])

# # Load FAISS database
# DB_FAISS_PATH = "vectorstore/db_faiss"
# embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
# db = FAISS.load_local(DB_FAISS_PATH, embedding_model, allow_dangerous_deserialization=True)

# # Create QA chain
# qa_chain = RetrievalQA.from_chain_type(
#     llm=load_llm(HUGGINGFACE_REPO_ID),
#     chain_type="stuff",
#     retriever=db.as_retriever(search_kwargs={'k': 3}),  # Fetch 3 most relevant documents
#     return_source_documents=True,
#     chain_type_kwargs={'prompt': set_custom_prompt(CUSTOM_PROMPT_TEMPLATE)}
# )

# @app.route('http://localhost:5000/medical-chat', methods=['POST'])
# def medical_chatbot():
#     try:
#         # Get user query from request body
#         data = request.json
#         user_query = data.get("message", "")

#         if not user_query:
#             return jsonify({"error": "No message provided"}), 400

#         print("Calling model with message:", user_query)
#         print("Huggingface API Key:", HF_TOKEN)

#         # Process the query using the QA chain
#         response = qa_chain.invoke({'query': user_query})

#         bot_response = response.get("result", "Sorry, I couldn't process that request.")
#         source_documents = response.get("source_documents", [])

#         return jsonify({
#             "response": bot_response,
#             "sources": [doc.metadata for doc in source_documents]
#         })

#     except Exception as error:
#         print("Medical chat error:", error)
#         return jsonify({"error": "Error processing medical chat request"}), 500

# if __name__ == "__main__":
#     app.run(debug=True)
































# import os
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from langchain_huggingface import HuggingFaceEndpoint
# from langchain_core.prompts import PromptTemplate
# from langchain.chains import RetrievalQA
# from langchain_huggingface import HuggingFaceEmbeddings
# from langchain_community.vectorstores import FAISS
# from dotenv import load_dotenv

# # Load environment variables
# load_dotenv()
# HF_TOKEN = os.getenv("HF_TOKEN")
# HUGGINGFACE_REPO_ID = "mistralai/Mistral-7B-Instruct-v0.3"

# # Initialize Flask app
# app = Flask(__name__)
# CORS(app)  # Enable CORS

# # Initialize the QA chain
# def initialize_qa_chain():
#     # Load LLM
#     llm = HuggingFaceEndpoint(
#         repo_id=HUGGINGFACE_REPO_ID,
#         temperature=0.5,
#         model_kwargs={"token": HF_TOKEN, "max_length": "512"}
#     )

#     # Load embeddings and vector store
#     DB_FAISS_PATH = "vectorstore/db_faiss"
#     embedding_model = HuggingFaceEmbeddings(
#         model_name="sentence-transformers/all-MiniLM-L6-v2"
#     )
#     db = FAISS.load_local(DB_FAISS_PATH, embedding_model)

#     # Create prompt template
#     prompt = PromptTemplate(
#         template="""
#         Use the pieces of information provided in the context to answer the user's question.
#         If you don't know the answer, just say that you don't know. Don't try to make up an answer.
#         Don't provide anything out of the given context.

#         Context: {context}
#         Question: {question}

#         Start the answer directly. No small talk please.
#         """,
#         input_variables=["context", "question"]
#     )

#     # Create QA chain
#     return RetrievalQA.from_chain_type(
#         llm=llm,
#         chain_type="stuff",
#         retriever=db.as_retriever(search_kwargs={'k': 3}),
#         return_source_documents=True,
#         chain_type_kwargs={'prompt': prompt}
#     )

# # Initialize QA chain
# qa_chain = None

# # @app.before_first_request
# # @app.before_request
# # @app.on_first_request
# # def setup_qa_chain():
# #     global qa_chain
# #     qa_chain = initialize_qa_chain()



# first_request_handled = False

# @app.before_request
# def setup_qa_chain():
#     global first_request_handled, qa_chain
#     if not first_request_handled:
#         qa_chain = initialize_qa_chain()
#         first_request_handled = True




# @app.route('/medical-chat', methods=['POST'])
# def medical_chatbot():
#     try:
#         data = request.json
#         user_query = data.get("message", "")

#         if not user_query:
#             return jsonify({"error": "No message provided"}), 400

#         # Ensure QA chain is initialized
#         global qa_chain
#         if qa_chain is None:
#             qa_chain = initialize_qa_chain()

#         # Process query
#         response = qa_chain.invoke({'query': user_query})

#         return jsonify({
#             "response": response["result"],
#             "sources": [doc.metadata for doc in response["source_documents"]]
#         })

#     except Exception as error:
#         print("Medical chat error:", error)
#         return jsonify({"error": str(error)}), 500

# if __name__ == "__main__":
#     app.run(port=5000, debug=True)




















# import os
# from flask import Flask, request, jsonify  # ✅ Flask should be imported from flask
# from flask_cors import CORS  # ✅ Correct import for enabling CORS
# from langchain_huggingface import HuggingFaceEndpoint
# from langchain_core.prompts import PromptTemplate
# from langchain.chains import RetrievalQA
# from langchain_huggingface import HuggingFaceEmbeddings
# from langchain_community.vectorstores import FAISS
# from dotenv import load_dotenv

# # Load environment variables
# load_dotenv()
# HF_TOKEN = os.getenv("HF_TOKEN")
# HUGGINGFACE_REPO_ID = "mistralai/Mistral-7B-Instruct-v0.3"

# # Initialize Flask app
# app = Flask(__name__)
# CORS(app, resources={
#     r"/*": {
#         "origins": ["http://localhost:5000"],
#         "methods": ["OPTIONS", "POST"],
#         "allow_headers": ["Content-Type"]
#     }
# })

# # Initialize the QA chain
# def initialize_qa_chain():
#     try:
#         # Load LLM
#         llm = HuggingFaceEndpoint(
#             repo_id=HUGGINGFACE_REPO_ID,
#             temperature=0.5,
#             model_kwargs={"token": HF_TOKEN, "max_length": "512"}
#         )

#         # Load embeddings and vector store
#         DB_FAISS_PATH = os.path.join(os.path.dirname(__file__), "vectorstore/db_faiss")
#         print(f"Loading vector store from: {DB_FAISS_PATH}")
        
#         embedding_model = HuggingFaceEmbeddings(
#             model_name="sentence-transformers/all-MiniLM-L6-v2"
#         )
        
#         # Add allow_dangerous_deserialization=True
#         db = FAISS.load_local(DB_FAISS_PATH, embedding_model, allow_dangerous_deserialization=True)

#         # Create prompt template
#         prompt = PromptTemplate(
#             template="""
#             Use the pieces of information provided in the context to answer the user's question.
#             If you don't know the answer, just say that you don't know. Don't try to make up an answer.
#             Don't provide anything out of the given context.

#             Context: {context}
#             Question: {question}

#             Start the answer directly. No small talk please.
#             """,
#             input_variables=["context", "question"]
#         )

#         # Create QA chain
#         return RetrievalQA.from_chain_type(
#             llm=llm,
#             chain_type="stuff",
#             retriever=db.as_retriever(search_kwargs={'k': 3}),
#             return_source_documents=True,
#             chain_type_kwargs={'prompt': prompt}
#         )
#     except Exception as e:
#         print(f"Error initializing QA chain: {str(e)}")
#         raise

# # Initialize QA chain
# qa_chain = None

# @app.before_request
# def setup_qa_chain():
#     global qa_chain
#     if qa_chain is None:
#         try:
#             qa_chain = initialize_qa_chain()
#         except Exception as e:
#             print(f"Error in setup_qa_chain: {str(e)}")
#             return jsonify({"error": "Failed to initialize QA chain"}), 500

# @app.route('/medical-chat', methods=['POST', 'OPTIONS'])
# def medical_chatbot():
#     if request.method == 'OPTIONS':
#         return '', 204
        
#     try:
#         data = request.json
#         user_query = data.get("message", "")

#         if not user_query:
#             return jsonify({"error": "No message provided"}), 400

#         # Ensure QA chain is initialized
#         global qa_chain
#         if qa_chain is None:
#             qa_chain = initialize_qa_chain()

#         # Process query
#         response = qa_chain.invoke({'query': user_query})

#         return jsonify({
#             "response": response["result"],
#             "sources": [doc.metadata for doc in response["source_documents"]]
#         })

#     except Exception as error:
#         print("Medical chat error:", error)
#         return jsonify({"error": str(error)}), 500

# if __name__ == "__main__":
#     app.run(port=4000, debug=True)


















# import os
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from langchain_huggingface import HuggingFaceEndpoint
# from langchain_core.prompts import PromptTemplate
# from langchain.chains import RetrievalQA
# from langchain_huggingface import HuggingFaceEmbeddings
# from langchain_community.vectorstores import FAISS
# from dotenv import load_dotenv

# # Load environment variables
# load_dotenv()
# HF_TOKEN = os.getenv("HF_TOKEN")
# HUGGINGFACE_REPO_ID = "mistralai/Mistral-7B-Instruct-v0.3"

# # Initialize Flask app
# app = Flask(__name__)
# CORS(app, resources={
#     r"/*": {
#         "origins": ["http://localhost:3000", "http://localhost:5000"],
#         "methods": ["OPTIONS", "POST"],
#         "allow_headers": ["Content-Type"]
#     }
# })

# # Initialize the QA chain
# def initialize_qa_chain():
#     try:
#         # Load LLM with corrected configuration
#         llm = HuggingFaceEndpoint(
#             repo_id=HUGGINGFACE_REPO_ID,
#             task="text-generation",
#             temperature=0.5,
#             max_length=512,  # Moved from model_kwargs
#             model_kwargs={
#                 "token": HF_TOKEN,
#                 "use_cache": True,
#                 "wait_for_model": True
#             }
#         )

#         # Load embeddings and vector store
#         DB_FAISS_PATH = os.path.join(os.path.dirname(__file__), "vectorstore/db_faiss")
#         print(f"Loading vector store from: {DB_FAISS_PATH}")
        
#         embedding_model = HuggingFaceEmbeddings(
#             model_name="sentence-transformers/all-MiniLM-L6-v2"
#         )
        
#         db = FAISS.load_local(DB_FAISS_PATH, embedding_model, allow_dangerous_deserialization=True)

#         # Create prompt template
#         prompt = PromptTemplate(
#             template="""
#             Use the pieces of information provided in the context to answer the user's question.
#             If you don't know the answer, just say that you don't know. Don't try to make up an answer.
#             Don't provide anything out of the given context.

#             Context: {context}
#             Question: {question}

#             Start the answer directly. No small talk please.
#             """,
#             input_variables=["context", "question"]
#         )

#         # Create QA chain
#         return RetrievalQA.from_chain_type(
#             llm=llm,
#             chain_type="stuff",
#             retriever=db.as_retriever(search_kwargs={'k': 3}),
#             return_source_documents=True,
#             chain_type_kwargs={'prompt': prompt}
#         )
#     except Exception as e:
#         print(f"Error initializing QA chain: {str(e)}")
#         raise

# # Initialize QA chain
# qa_chain = None

# @app.before_request
# def setup_qa_chain():
#     global qa_chain
#     if qa_chain is None:
#         try:
#             qa_chain = initialize_qa_chain()
#         except Exception as e:
#             print(f"Error in setup_qa_chain: {str(e)}")
#             return jsonify({"error": "Failed to initialize QA chain"}), 500

# @app.route('/medical-chat', methods=['POST', 'OPTIONS'])
# def medical_chatbot():
#     if request.method == 'OPTIONS':
#         return '', 204
        
#     try:
#         data = request.json
#         user_query = data.get("message", "")

#         if not user_query:
#             return jsonify({"error": "No message provided"}), 400

#         print(f"Received query: {user_query}")

#         # Ensure QA chain is initialized
#         global qa_chain
#         if qa_chain is None:
#             qa_chain = initialize_qa_chain()

#         # Process query
#         response = qa_chain.invoke({'query': user_query})
#         print(f"Generated response: {response}")

#         return jsonify({
#             "response": response["result"],
#             "sources": [doc.metadata for doc in response["source_documents"]]
#         })

#     except Exception as error:
#         print("Medical chat error:", error)
#         return jsonify({"error": str(error)}), 500

# if __name__ == "__main__":
#     print("Starting Flask server on port 4000...")
#     app.run(host='0.0.0.0', port=4000, debug=True)


















# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from langchain_huggingface import HuggingFaceEndpoint
# from langchain_core.prompts import PromptTemplate
# from langchain.chains import RetrievalQA
# from langchain_huggingface import HuggingFaceEmbeddings
# from langchain_community.vectorstores import FAISS
# from dotenv import load_dotenv
# import os

# # Load environment variables
# load_dotenv()
# HF_TOKEN = os.getenv("HF_TOKEN")
# HUGGINGFACE_REPO_ID = "mistralai/Mistral-7B-Instruct-v0.3"

# # Initialize Flask app
# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://localhost:5000"], "methods": ["OPTIONS", "POST"], "allow_headers": ["Content-Type"]}})

# def get_vectorstore():
#     try:
#         DB_FAISS_PATH = os.path.join(os.path.dirname(__file__), "vectorstore/db_faiss")
#         print(f"Loading vector store from: {DB_FAISS_PATH}")
#         embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
#         db = FAISS.load_local(DB_FAISS_PATH, embedding_model, allow_dangerous_deserialization=True)
#         return db
#     except Exception as e:
#         print(f"Error loading vector store: {str(e)}")
#         raise

# def set_custom_prompt():
#     template = """
#     Use the pieces of information provided in the context to answer user's question.
#     If you dont know the answer, just say that you dont know, dont try to make up an answer. 
#     Dont provide anything out of the given context

#     Context: {context}
#     Question: {question}

#     Start the answer directly. No small talk please.
#     """
#     return PromptTemplate(template=template, input_variables=["context", "question"])

# def load_llm(HF_TOKEN):
#     llm=HuggingFaceEndpoint(
#         repo_id="mistralai/Mistral-7B-Instruct-v0.3",
#         temperature=0.5,
#         model_kwargs={"token":HF_TOKEN,
#                       "max_length":"512"}
#     )
#     return llm
# # Initialize QA chain
# qa_chain = None

# def initialize_qa_chain():
#     try:
#         vectorstore = get_vectorstore()
#         if vectorstore is None:
#             raise Exception("Failed to load vector store")
#         return RetrievalQA.from_chain_type(
#             llm=load_llm(HF_TOKEN),
#             chain_type="stuff",
#             retriever=vectorstore.as_retriever(search_kwargs={'k': 3}),
#             return_source_documents=True,
#             chain_type_kwargs={'prompt': set_custom_prompt()}
#         )
#     except Exception as e:
#         print(f"Error initializing QA chain: {str(e)}")
#         raise


# @app.before_request
# def setup_qa_chain():
#     global qa_chain
#     if qa_chain is None:
#         try:
#             qa_chain = initialize_qa_chain()
#         except Exception as e:
#             print(f"Error in setup_qa_chain: {str(e)}")
#             raise e  # Raising error to stop app if critical error occurs

# @app.route('/medical-chat', methods=['POST', 'OPTIONS'])
# def medical_chatbot():
#     if request.method == 'OPTIONS':
#         return '', 204
        
#     try:
#         data = request.json
#         user_query = data.get("message", "")

#         if not user_query:
#             return jsonify({"error": "No message provided"}), 400

#         print(f"Received query: {user_query}")

#         # Ensure QA chain is initialized
#         global qa_chain
#         if qa_chain is None:
#             qa_chain = initialize_qa_chain()

#         # Process query
#         response = qa_chain.invoke({'query': user_query})
#         print(f"Generated response: {response}")

#         return jsonify({
#             "response": response["result"],
#             "sources": [doc.metadata for doc in response["source_documents"]]
#         })

#     except Exception as error:
#         print("Medical chat error:", error)
#         return jsonify({"error": str(error)}), 500

# if __name__ == "__main__":
#     print("Starting Flask server on port 4000...")
#     try:
#         get_vectorstore()
#         app.run(host='0.0.0.0', port=4000, debug=True)
#     except Exception as e:
#         print(f"Failed to start server: {str(e)}")


import os

from langchain_huggingface import HuggingFaceEndpoint
from langchain_core.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

## Uncomment the following files if you're not using pipenv as your virtual environment manager
#from dotenv import load_dotenv, find_dotenv
#load_dotenv(find_dotenv())


# Step 1: Setup LLM (Mistral with HuggingFace)
HF_TOKEN=os.environ.get("HF_TOKEN")
HUGGINGFACE_REPO_ID="mistralai/Mistral-7B-Instruct-v0.3"

def load_llm(huggingface_repo_id):
    llm=HuggingFaceEndpoint(
        repo_id=huggingface_repo_id,
        temperature=0.5,
        model_kwargs={"token":HF_TOKEN,
                      "max_length":"512"}
    )
    return llm

# Step 2: Connect LLM with FAISS and Create chain

CUSTOM_PROMPT_TEMPLATE = """
Use the pieces of information provided in the context to answer user's question.
If you dont know the answer, just say that you dont know, dont try to make up an answer. 
Dont provide anything out of the given context

Context: {context}
Question: {question}

Start the answer directly. No small talk please.
"""

def set_custom_prompt(custom_prompt_template):
    prompt=PromptTemplate(template=custom_prompt_template, input_variables=["context", "question"])
    return prompt

# Load Database
DB_FAISS_PATH="vectorstore/db_faiss"
embedding_model=HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
db=FAISS.load_local(DB_FAISS_PATH, embedding_model, allow_dangerous_deserialization=True)

# Create QA chain
qa_chain=RetrievalQA.from_chain_type(
    llm=load_llm(HUGGINGFACE_REPO_ID),
    chain_type="stuff",
    retriever=db.as_retriever(search_kwargs={'k':3}),
    return_source_documents=True,
    chain_type_kwargs={'prompt':set_custom_prompt(CUSTOM_PROMPT_TEMPLATE)}
)

# Now invoke with a single query
user_query=input("Write Query Here: ")
response=qa_chain.invoke({'query': user_query})
print("RESULT: ", response["result"])
print("SOURCE DOCUMENTS: ", response["source_documents"])