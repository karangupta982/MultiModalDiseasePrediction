import React, { useState, useRef, useEffect } from 'react';
import Loader from './Loader';

const HealthAssessmentChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isAssessmentComplete, setIsAssessmentComplete] = useState(false);
    
    const  BASE_URL = process.env.REACT_APP_BASE_URL;
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        height: '',
        weight: '',
        symptoms: '',
        medicalHistory: '',
        lifestyle: '',
        medications: ''
    });
    const messagesEndRef = useRef(null);

    // Your existing questions array stays the same
    const questions = [
        // Basic Information
        { key: 'age', text: "What is your age?", validation: value => !isNaN(value) && value > 0 && value < 120 },
        { key: 'gender', text: "What is your gender? (Male/Female/Other)", validation: value => ['male', 'female', 'other'].includes(value.toLowerCase()) },
        { key: 'height', text: "What is your height in cm?", validation: value => !isNaN(value) && value > 0 },
        { key: 'weight', text: "What is your weight in kg?", validation: value => !isNaN(value) && value > 0 },
        
        // Vital Signs
        { key: 'bloodPressure', text: "What is your blood pressure? (e.g., 120/80)", validation: value => /^\d{2,3}\/\d{2,3}$/.test(value) },
        { key: 'heartRate', text: "What is your resting heart rate (beats per minute)?", validation: value => !isNaN(value) && value > 0 },
        { key: 'bloodSugar', text: "If known, what is your blood sugar level (mg/dL)?", validation: value => !isNaN(value) || value.toLowerCase() === 'unknown' },
        
        // Symptoms
        { key: 'symptoms', text: "What symptoms are you experiencing? Please describe.", validation: value => value.length > 0 },
        { key: 'symptomsDuration', text: "How long have you had these symptoms?", validation: value => value.length > 0 },
        { key: 'symptomsServerity', text: "On a scale of 1-10, how severe are your symptoms?", validation: value => !isNaN(value) && value >= 1 && value <= 10 },
        
        // Medical History
        { key: 'medicalHistory', text: "Do you have any significant medical conditions or past surgeries?", validation: value => true },
        { key: 'familyHistory', text: "Any significant diseases in your immediate family?", validation: value => true },
        { key: 'allergies', text: "Do you have any allergies? If yes, please list them.", validation: value => true },
        { key: 'medications', text: "List any current medications or supplements:", validation: value => true },
        
        // Lifestyle
        { key: 'exercise', text: "How often do you exercise? (type and frequency)", validation: value => true },
        { key: 'diet', text: "Describe your typical diet:", validation: value => true },
        { key: 'smoking', text: "Do you smoke? If yes, how much?", validation: value => true },
        { key: 'alcohol', text: "How often do you consume alcohol?", validation: value => true },
        { key: 'sleep', text: "How many hours of sleep do you typically get?", validation: value => !isNaN(value) || value.includes('hours') },
        
        // Mental Health
        { key: 'stressLevel', text: "On a scale of 1-10, how would you rate your current stress level?", validation: value => !isNaN(value) && value >= 1 && value <= 10 },
        { key: 'moodChanges', text: "Have you experienced significant mood changes recently?", validation: value => true },
        { key: 'mentalHealth', text: "Are you experiencing anxiety or depression symptoms?", validation: value => true }
    ];

    useEffect(() => {
        // Initial greeting
        setMessages([{
            text: "Hello! I'm your health assessment assistant. I'll ask you a few questions to evaluate your health. Let's start with your age.",
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const currentQ = questions[currentQuestion];
        if (!currentQ.validation(input)) {
            setMessages(prev => [...prev, 
                { text: input, sender: 'user' },
                { text: "Sorry, that doesn't seem to be a valid response. Please try again.", sender: 'bot', error: true }
            ]);
            setInput('');
            return;
        }

        setMessages(prev => [...prev, { text: input, sender: 'user' }]);
        const newFormData = { ...formData, [currentQ.key]: input };
        setFormData(newFormData);
        setInput('');
        setIsLoading(true);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(curr => curr + 1);
            setMessages(prev => [...prev, { text: questions[currentQuestion + 1].text, sender: 'bot' }]);
            setIsLoading(false);
        } else {
            try {
                const healthData = {
                    features: newFormData
                };
            
                // const response = await fetch("http://localhost:5000/api/predict/healthcheckup", {
                const response = await fetch(BASE_URL + '/predict/healthcheckup', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(healthData)
                });
                const data = await response.json();
                console.log("Health assessment response:", data);
                setMessages(prev => [...prev, { 
                    text: data.response || data.message || "Could not get assessment",
                    sender: 'bot',
                    isAssessment: true
                }]);
                setIsAssessmentComplete(true); // Set assessment as complete
            } catch (error) {
                console.error('Error:', error);
                setMessages(prev => [...prev, { 
                    text: "I'm sorry, I encountered an error while processing your assessment. Please try again later.",
                    sender: 'bot',
                    error: true
                }]);
            }
           
        }
        setIsLoading(false);
    };

    return (

    //     <div className="fixed inset-0 z-[20] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
    //   <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        




        <div className='relative top-[10vh] right-0 left-0 bottom-0 backdrop-blur-sm  bg-richblack-900 bg-opacity-10'>
            <div className="flex flex-col h-[700px] w-full max-w-5xl mx-auto border  bg-richblack-800 shadow-lg mt-[8vh] rounded-xl">
                <div className="bg-richblack-600 rounded-t-xl text-white p-4  text-center">
                    <h2 className="text-3xl font-thin mb-[0.5vh]">Health Assessment</h2>
                    <p className="text-sm">Answer questions about your health</p>
                </div>

                <div className="flex-1 p-4 overflow-y-auto rounded-lg font-medium">
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
                                        : message.isAssessment
                                        ? 'bg-green-50 border border-green-200 text-gray-700'
                                        : 'bg-white text-gray-800'
                                } ${message.error ? 'bg-red-600' : ''}`}
                            >
                                {message.text + '.'}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="text-center">
                            <div className="inline-block p-3 bg-white rounded-lg">
                                <Loader />
                                {/* <Loader text="Loading..." speed={0.5} /> */}
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {!isAssessmentComplete && currentQuestion < questions.length && (
                    <form onSubmit={handleSubmit} className="p-4 border-t">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={questions[currentQuestion]?.text || "Assessment complete"}
                                className="flex-1 p-2 border rounded text-black text-xl"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-300"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>



    );
};

export default HealthAssessmentChat;














