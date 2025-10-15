import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown from "./components/DropDown";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoadingDots from "./components/LoadingDots";
import { generateBio } from "./api/generateBio";
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
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <p className="border rounded-2xl py-1 px-4 text-slate-500 text-sm mb-5 hover:scale-105 transition duration-300 ease-in-out">
          <b>126,657</b> bios generated so far
        </p>
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Generate your next Twitter bio using AI
        </h1>
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <img
              src="/assets/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Drop in your job{" "}
              <span className="text-slate-500">(or your favorite hobby)</span>.
            </p>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={"e.g. Amazon CEO"}
          />
          <div className="flex mb-5 items-center space-x-3">
            <img src="/assets/2-black.png" width={30} height={30} alt="2 icon" />
            <p className="text-left font-medium">Select your vibe.</p>
          </div>
          <div className="block">
            <DropDown vibe={vibe} setVibe={setVibe} />
          </div>
          {loading ? (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          ) : (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
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
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
          {generatedBios && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={bioRef}
                >
                  Your generated bios
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedBios
                  .split(/1\.|2\.|3\./)
                  .filter((b) => b.trim())
                  .map((generatedBio, idx) => (
                    <div
                      className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedBio.trim());
                        toast("Bio copied to clipboard", {
                          icon: "✂️",
                        });
                      }}
                      key={idx}
                    >
                      <p>{generatedBio.trim()}</p>
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
