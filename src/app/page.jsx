"use client";
import { useState } from "react";
import Image from 'next/image';

export default function Main() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch('/api/evaluate', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white">
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
            placeholder="What did you do last week?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />

          <button
            className={`absolute top-2 right-3 bg-gray-600 bg-opacity-20 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200 ${
              loading ? "cursor-not-allowed opacity-50" : "hover:bg-opacity-50 hover:scale-105"
            }`}
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
            <div className="mt-6 p-4 bg-gray-800 bg-opacity-30 rounded-lg">
              <p className="text-white whitespace-pre-line">{response}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}