import { useNavigate } from "react-router-dom";

const LoginMessage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-pink-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-200 to-pink-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-red-200 to-pink-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-red-100 to-pink-100 rounded-full opacity-30 blur-2xl"></div>
      </div>

      {/* Main Content */}
      <div
        className="relative z-10 text-center"
        style={{ marginTop: "-130px" }}
      >
        {/* Icon */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        {/* Main Message */}
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-lg mx-auto border border-gray-100">
          <h3 className="text-4xl font-bold bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] bg-clip-text text-transparent mb-6">
            Please login to continue
          </h3>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            with your credentials to proceed.
          </p>

          {/* Login Button */}
          <button
            onClick={() => navigate("/auth")}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white font-semibold rounded-xl hover:from-[#172554] hover:to-[#1d4ed8] transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginMessage;
