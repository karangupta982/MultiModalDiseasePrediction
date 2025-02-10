// Ask Questions Page
function AskQuestionsPage(){
    return (
      <div className="bg-gray-900 text-white min-h-screen px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Ask Questions</h1>
          <p className="text-lg leading-relaxed mb-6">
            Got questions about your health? Our AI-driven chat model is here to help. Ask anything
            about symptoms, treatments, or general health advice, and get instant responses powered by
            advanced machine learning.
          </p>
          <img
            src="https://via.placeholder.com/800x400"
            alt="Ask questions illustration"
            className="rounded-xl mx-auto mb-6"
          />
          <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-full mt-6">
            Start Chat
          </button>
        </div>
      </div>
    );
  };
  
  export default AskQuestionsPage