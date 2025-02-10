// AI Medical Health Checkup Page
function HealthCheckupPage() {
    return (
      <div className="bg-gray-900 text-white min-h-screen px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">AI Medical Health Checkup</h1>
          <p className="text-lg leading-relaxed mb-6">
            Our AI-powered health checkup analyzes your responses to a series of questions to provide
            personalized health insights. It's quick, reliable, and designed to help you understand
            your health better.
          </p>
          <img
            src="https://via.placeholder.com/800x400"
            alt="Health checkup illustration"
            className="rounded-xl mx-auto mb-6"
          />
          <button className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-full mt-6">
            Start Checkup
          </button>
        </div>
      </div>
    );
  };
  

  export default HealthCheckupPage