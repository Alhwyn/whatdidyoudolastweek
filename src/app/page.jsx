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
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white">
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <a href="https://www.producthunt.com/posts/what-did-you-do-last-week?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-what&#0045;did&#0045;you&#0045;do&#0045;last&#0045;week" target="_blank"><Image src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=925646&theme=dark&t=1740894799068" alt="What&#0032;did&#0032;you&#0032;do&#0032;last&#0032;week&#0063; - Evaluates&#0032;your&#0032;5&#0032;bullet&#0032;points | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
      
      </div>
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-light tracking-wide text-blue-50 drop-shadow-lg">
          What did you do last week?
        </h1>
        <p className="text-md md:text-lg text-gray-400 mt-2 font-mono">
          AI Musk will evaluate your five bullet points of what you accomplish to determine if you're hired or fired.
        </p>
        {/* Container for the textarea, button, and loading indicator */}
        <div className="relative mt-6 max-w-2xl mx-auto">
          <textarea
            className={`w-full h-64 p-4 rounded-lg border-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
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
              absolute top-2 right-3 
              bg-gray-600 bg-opacity-20 
              text-white px-4 py-2 
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
                width={192}
                height={192}
                className="object-contain animate-elon-bounce"
              />
            </div>
          )}

          {response && !loading && (
            <div
              className={`mt-6 p-4 rounded-lg border-2 ${
                checkEmploymentStatus(response) === true
                  ? 'bg-gray-800 bg-opacity-25 border-green-800 border-opacity-5'
                  : 'bg-gray-800 bg-opacity-0 border-red-800 border-opacity-50'
              }`}
            >
            <p className=" text-white whitespace-pre-line">{response}</p>
            <a
              className="twitter-share-button"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`}
            >
              <Image
                src="/icons8-x-48-2.png"
                width={30}
                height={30}
                alt="Twitter icon"
              />
            </a>
          </div>
            
          )}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <a
          href="https://x.com/alhwynn"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
        >
          <Image
            src="/icons8-x-48-2.png"
            width={32}
            height={32}
            alt="X (Twitter) icon"
          />
          <span className="text-sm">@alhwynn</span>
        </a>
      </div>
      

      
    </div>
  );
}