"use client";
import { useState } from "react";
import Image from 'next/image';

export default function Main() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    if (!input.trim()) return;
    
    const submittedInput = input; // Store input value
      setLoading(true);
      try {
        const res = await fetch('/api/evaluate', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: submittedInput }), // Use stored input
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setResponse(data.response);
      } catch (error) {
        console.error("Submission error:", error);
        setResponse("Error: Unable to process your request. Please try again.");
        setInput(submittedInput); // Restore input on error
      } finally {
        setLoading(false);
      }
    };

  function checkEmploymentStatus(text) {
    const regex = /\b(HIRED|hired)\b/;
    return regex.test(text);
  }

  const tweetText = `Look at my result: ${checkEmploymentStatus(response) ? "HIRED" : "FIRED"} - What did you do last week? AI Elon will evaluate your five bullet points https://whatdidyoudolastweek.biz`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white p-4">
      {/* Product Hunt Badge - Hide on small screens */}
      <div className="absolute top-0 right-0 mt-4 mr-4 hidden sm:block">
        <a href="https://www.producthunt.com/posts/what-did-you-do-last-week?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-what&#0045;did&#0045;you&#0045;do&#0045;last&#0045;week" 
           target="_blank">
          <Image 
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=925646&theme=dark&t=1740894799068" 
            alt="What did you do last week? - Product Hunt" 
            width={250} 
            height={54} 
            className="w-auto h-auto"
          />
        </a>
      </div>
  
      <div className="text-center w-full max-w-2xl px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-blue-50 drop-shadow-lg mb-4">
          What did you do last week?
        </h1>
        <p className="text-sm sm:text-md md:text-lg text-gray-400 font-mono mb-6">
          AI Musk will evaluate your five bullet points of what you accomplish to determine if you're hired or fired.
        </p>
  
        <div className="relative w-full">
          <textarea
            className={`w-full h-48 sm:h-64 p-3 sm:p-4 rounded-lg border-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm sm:text-base ${
              loading ? 'bg-transparent' : 'bg-gray-800 bg-opacity-30'
            }`}
            placeholder={loading ? '' : "What did you do last week?"}
            value={loading ? '' : input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            maxLength="5000"
          />
  
          <button
            className={`
              absolute top-2 right-2 sm:right-3
              bg-gray-600 bg-opacity-20 
              text-white px-3 sm:px-4 py-1.5 sm:py-2
              text-sm sm:text-base
              rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              transition-all duration-200 ease-in-out
              ${loading 
                ? "cursor-not-allowed opacity-50" 
                : "hover:bg-opacity-50 hover:scale-105 hover:shadow-lg hover:text-blue-200 hover:ring-2 hover:ring-white-200"
              }
            `}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Checking..." : "Check"}
          </button>
  
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg">
              <Image
                src="/IMG_5511.PNG"
                alt="Bouncing Elon"
                width={150}
                height={150}
                className="object-contain animate-elon-bounce w-32 sm:w-48"
              />
            </div>
          )}
  
          {response && !loading && (
            <div
              className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg border-2 ${
                checkEmploymentStatus(response) === true
                  ? 'bg-gray-800 bg-opacity-25 border-green-800 border-opacity-5'
                  : 'bg-gray-800 bg-opacity-0 border-red-800 border-opacity-50'
              }`}
            >
              <p className="text-white whitespace-pre-line text-sm sm:text-base">{response}</p>
              <a
                className="twitter-share-button mt-3 inline-flex items-center hover:opacity-80 transition-opacity"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/icons8-x-48-2.png"
                  width={24}
                  height={24}
                  alt="Twitter icon"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
              </a>
            </div>
          )}
        </div>
  
        {/* Footer */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
          <a
            href="https://x.com/alhwynn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 text-xs sm:text-sm"
          >
            <Image
              src="/icons8-x-48-2.png"
              width={16}
              height={16}
              alt="X (Twitter) icon"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            <span>@alhwynn</span>
          </a>
        </div>
      </div>
    </div>
  );
}