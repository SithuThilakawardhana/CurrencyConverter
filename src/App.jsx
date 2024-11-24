import { useState } from "react";
import CurrencyConverter from "./components/currency-converter";

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => setDarkMode(!darkMode);

    return (
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen`}>
            <div className="container mx-auto p-5">
                <div className="flex justify-end mb-5">
                    <button
                        onClick={toggleTheme}
                        className={`px-4 py-2 rounded-md ${
                            darkMode
                                ? "bg-gray-800 text-white hover:bg-gray-700"
                                : "bg-gray-300 text-black hover:bg-gray-400"
                        }`}
                    >
                        Toggle {darkMode ? "Light" : "Dark"} Mode
                    </button>
                </div>
                <CurrencyConverter darkMode={darkMode} />
            </div>
        </div>
    );
}

export default App;
