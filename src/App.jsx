import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown from "./components/DropDown";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoadingDots from "./components/LoadingDots";
import { generateBio } from "./api/generateBio";
import AnimatedHeading from "./components/AnimatedHeading";
import "./index.css";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState("Professional");
  const [generatedBios, setGeneratedBios] = useState("");
  const bioRef = useRef(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `Generate 3 ${
    vibe === "Casual" ? "relaxed" : vibe === "Funny" ? "silly" : "Professional"
  } twitter biographies with no hashtags and clearly labeled "1.", "2.", and "3.". Only return these 3 twitter bios, nothing else. ${
    vibe === "Funny" ? "Make the biographies humorous." : ""
  } Make sure each generated biography is less than 300 characters, has short sentences that are found in Twitter bios, and feel free to use this context as well: ${bio}${
    bio.slice(-1) === "." ? "" : "."
  }`;

  const handleGenerateBio = async (e) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);
    try {
      const result = await generateBio(prompt);
      setGeneratedBios(result);
      scrollToBios();
    } catch (err) {
      toast.error("Failed to generate bio");
    }
    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen bg-black">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <p className="border border-gray-700 rounded-2xl py-1 px-4 text-gray-300 text-sm mb-5 hover:scale-105 transition duration-300 ease-in-out hover:border-purple-600 hover:shadow-[0_4px_15px_rgba(128,0,128,0.3)]">
          <b>126,657</b> bios generated so far
        </p>
        <AnimatedHeading />
        {/* <div className="flex items-center space-x-3 mb-10">
          <span className="text-2xl">👋</span>
          <span className="font-medium text-gray-700">Mixtral 8x7B</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
          </label>
          <span className="font-medium text-gray-700">Llama 3.1 8B</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#4F46E5" fillOpacity="0.2"/>
            <path d="M2 17L12 22L22 17" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div> */}
        <div className="max-w-xl w-full">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-bold">
              1
            </div>
            <p className="text-left font-medium text-white">
              Drop in your job{" "}
              <span className="text-gray-400">(or your favorite hobby)</span>.
            </p>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-md border border-gray-600 bg-gray-900 shadow-sm focus:border-white focus:ring-white p-3 text-white"
            placeholder={"e.g. Amazon CEO"}
          />
          <div className="flex mt-10 mb-4 items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-bold">
              2
            </div>
            <p className="text-left font-medium text-white">Select your vibe.</p>
          </div>
          <div className="block">
            <DropDown vibe={vibe} setVibe={setVibe} />
          </div>
          {loading ? (
            <button
              className="bg-white rounded-xl text-black font-medium px-4 py-3 mt-8 hover:bg-gray-200 w-full"
              disabled
            >
              <LoadingDots color="black" style="large" />
            </button>
          ) : (
            <button
              className="bg-white rounded-xl text-black font-medium px-4 py-3 mt-8 hover:bg-gray-200 w-full"
              onClick={handleGenerateBio}
            >
              Generate your bio &rarr;
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-0 w-full max-w-xl my-10" />
        <div className="w-full max-w-xl">
          {generatedBios && (
            <>
              <div className="mb-8">
                <h2
                  className="sm:text-4xl text-3xl font-bold text-white text-center"
                  ref={bioRef}
                >
                  Your generated bios
                </h2>
              </div>
              <div className="space-y-6 flex flex-col items-center justify-center">
                {generatedBios
                  .split(/1\.|2\.|3\./)
                  .filter((b) => b.trim())
                  .map((generatedBio, idx) => (
                    <div
                      className="bg-gray-900 rounded-xl shadow-md p-6 hover:bg-gray-800 transition cursor-copy border border-gray-700 w-full hover:shadow-[0_10px_30px_rgba(128,0,128,0.3)]"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedBio.trim());
                        toast("Bio copied to clipboard", {
                          icon: "✂️",
                        });
                      }}
                      key={idx}
                    >
                      <p className="text-gray-100 leading-relaxed">{generatedBio.trim()}</p>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}