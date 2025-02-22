import React, { useState, useRef, useEffect } from 'react';

const ChatComponent = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const suggestedQuestions = [
        "How can I improve my sleep quality?",
        "What are natural ways to reduce stress?",
        "Tips for maintaining a healthy schedule?",
        "How does exercise affect any disease?",
        "Best foods for better health?",
        "How to create a bedtime routine?",
        "Ways to deal with insomnia?",
        
    ];

    // Initial message
    useEffect(() => {
        setMessages([{
            text: "Hello! I'm an AI assistant. How can I help you today?",
            sender: 'bot',
            isGreeting: true
        }]);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSuggestedQuestion = (question) => {
        setInput(question);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // const res = await fetch('https://predictcareai.onrender.com/api/predict/chat', {
                const res = await fetch('http://localhost:5000/api/predict/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });
            const data = await res.json();
            
            // Add bot response
            const botMessage = { text: data.response, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = { 
                text: 'Sorry, I encountered an error processing your request.',
                sender: 'bot',
                error: true
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='relative top-[10vh] right-0 left-0 bottom-0 backdrop-blur-sm  bg-richblack-900 bg-opacity-10'>
            <div className="flex flex-col h-[700px] max-w-5xl mx-auto border rounded-2xl bg-richblack-900 shadow-lg  mt-[8vh]">
                <div className="bg-richblack-600 text-white p-4  text-center rounded-t-2xl">
                    <h2 className="text-3xl font-thin mb-[0.5vh]">AI Doctor Assistant</h2>
                    <p className="text-sm">Ask me anything</p>
                </div>

                <div className="flex-1 p-4 overflow-y-auto">
                    {messages.length === 1 && (
                        <div className="mb-6">
                            <p className="text-sm text-white mb-2">Suggested questions:</p>
                            <div className="flex flex-wrap gap-2">
                                {suggestedQuestions.map((question, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestedQuestion(question)}
                                        className="px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-full border transition-colors"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                        >
                            <div
                                className={`inline-block p-3 rounded-lg max-w-[80%] ${
                                    message.sender === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : message.isGreeting
                                        ? 'bg-yellow-50 border border-yellow-200 text-gray-700'
                                        : 'bg-gray-100 text-gray-800'
                                } ${message.error ? 'bg-red-100' : ''}`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="text-center">
                            <div className="inline-block p-3 bg-gray-100 rounded-lg">
                                Thinking...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="p-4 border-t">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 p-2 border rounded text-black text-xl"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-300"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatComponent; 