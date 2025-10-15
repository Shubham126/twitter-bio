import { useEffect, useState } from "react";

const platforms = ["Twitter", "Instagram", "Facebook"];
const golden = "#FFD700";

const HoverWord = ({ children, className = "" }) => (
  <span className={`inline-block transition-colors duration-300 hover:text-violet-700 ${className}`}>
    {children}
  </span>
);

const renderHoverableText = (text, className = "") => {
  return text.split(' ').map((word, index) => (
    <span key={index}>
      <HoverWord className={className}>{word}</HoverWord>
      {index < text.split(' ').length - 1 && ' '}
    </span>
  ));
};


export default function AnimatedHeading() {
  const [currentPlatform, setCurrentPlatform] = useState(platforms[0]);
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [platformIndex, setPlatformIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingSpeed = isDeleting ? 60 : 120;
    let timeout;

    if (!isDeleting && index < platforms[platformIndex].length) {
      timeout = setTimeout(() => {
        setDisplayText(
          platforms[platformIndex].substring(0, index + 1)
        );
        setIndex(index + 1);
      }, typingSpeed);
    } else if (isDeleting && index > 0) {
      timeout = setTimeout(() => {
        setDisplayText(
          platforms[platformIndex].substring(0, index - 1)
        );
        setIndex(index - 1);
      }, typingSpeed);
    } else if (!isDeleting && index === platforms[platformIndex].length) {
      timeout = setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && index === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setPlatformIndex((platformIndex + 1) % platforms.length);
      }, 400);
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting, platformIndex]);

  return (
    <div className="mb-10 transition-all duration-300 hover:brightness-150 cursor-pointer">
      <div className="sm:text-6xl text-4xl max-w-[708px] font-bold text-white text-center">
        {renderHoverableText("Generate your next", "text-white")}
      </div>
      <div className="sm:text-6xl text-4xl max-w-[708px] font-bold text-center">
        <span style={{ color: golden }}>{displayText} </ span>
        {renderHoverableText("bio", "text-white")}
      </div>
      <div className="sm:text-6xl text-4xl max-w-[708px] font-bold text-white text-center">
        {renderHoverableText("using AI", "text-white")}
      </div>
    </div>
  );
}
