export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-5 border-b pb-7 sm:px-4 px-2">
      <a href="/" className="flex items-center space-x-2">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 16V4C21 3.44772 20.5523 3 20 3H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 11H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 15H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19.333 13.667l-9 9h-3.333v-3.333l9-9a2.357 2.357 0 0 1 3.333 3.333z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="flex flex-col">
          <h1 className="sm:text-2xl text-xl font-bold tracking-tight">
             Tune Your Bio
          </h1>
          <p className="text-xs text-gray-500">powered by max</p>
        </div>
      </a>
      
      <a 
        href=" " 
        className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
      >
        <img 
          src="/assets/max.jpg" 
          alt="Max" 
          className="w-24 rounded-full"
        />
      </a>
    </header>
  );
}
