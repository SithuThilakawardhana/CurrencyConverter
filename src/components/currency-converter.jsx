/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CurrencyDropdown from "./dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { motion } from "framer-motion";

const CurrencyConverter = ({ darkMode }) => {
    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [converting, setConverting] = useState(false);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || ["INR", "EUR"]);

    const fetchCurrencies = async () => {
        try {
            const res = await fetch("https://api.frankfurter.app/currencies");
            if (!res.ok) throw new Error("Failed to fetch currencies.");
            const data = await res.json();
            setCurrencies(Object.keys(data));
        } catch (error) {
            console.error("Error Fetching", error);
            setError("Failed to load currencies. Please try again later.");
        }
    };

    useEffect(() => {
        fetchCurrencies();
    }, []);

    const convertCurrency = async () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            setError("Please enter a valid positive number for the amount.");
            return;
        }
        setError(null); // Clear previous errors
        setConverting(true);
        try {
            const res = await fetch(
                `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
            );
            if (!res.ok) throw new Error("Failed to fetch conversion.");
            const data = await res.json();
            setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
        } catch (error) {
            console.error("Error Fetching Conversion", error);
            setError("Failed to convert currencies. Please try again.");
        } finally {
            setConverting(false);
        }
    };

    const handleFavorite = (currency) => {
        let updatedFavorites = [...favorites];
        if (favorites.includes(currency)) {
            updatedFavorites = updatedFavorites.filter((fav) => fav !== currency);
        } else {
            updatedFavorites.push(currency);
        }
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`max-w-xl mx-auto my-10 p-5 rounded-lg shadow-md ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
            }`}
        >
            <h2 className="mb-5 text-2xl font-semibold">Currency Converter</h2>

            {error && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`mb-4 p-3 rounded-md text-sm ${
                        darkMode ? "bg-red-600 text-white" : "bg-red-100 text-red-600"
                    }`}
                >
                    {error}
                </motion.div>
            )}

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <CurrencyDropdown
                    favorites={favorites}
                    currencies={currencies}
                    title="From:"
                    currency={fromCurrency}
                    setCurrency={setFromCurrency}
                    handleFavorite={handleFavorite}
                    darkMode={darkMode}
                />
                <motion.div
                    className="flex justify-center -mb-5 sm:mb-0"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <button
                        onClick={swapCurrencies}
                        className={`p-2 rounded-full cursor-pointer ${
                            darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        <HiArrowsRightLeft className={darkMode ? "text-white" : "text-gray-700"} />
                    </button>
                </motion.div>
                <CurrencyDropdown
                    favorites={favorites}
                    currencies={currencies}
                    title="To:"
                    currency={toCurrency}
                    setCurrency={setToCurrency}
                    handleFavorite={handleFavorite}
                    darkMode={darkMode}
                />
            </motion.div>

            <div className="mt-4">
                <label htmlFor="amount" className="block text-sm font-medium">
                    Amount:
                </label>
                <motion.input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    whileFocus={{ scale: 1.02 }}
                    className={`w-full p-2 border rounded-md shadow-sm mt-1 focus:outline-none ${
                        darkMode ? "border-gray-600 bg-gray-900 text-white" : "border-gray-300 text-gray-900"
                    }`}
                />
            </div>

            <motion.div
                className="flex justify-end mt-6"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
            >
                <button
                    onClick={convertCurrency}
                    className={`px-5 py-2 rounded-md focus:outline-none focus:ring-2 ${
                        darkMode
                            ? "bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-400"
                            : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
                    } ${converting ? "animate-pulse" : ""}`}
                >
                    Convert
                </button>
            </motion.div>

            {convertedAmount && (
                <motion.div
                    className={`mt-4 text-lg font-medium text-right ${
                        darkMode ? "text-green-400" : "text-green-600"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    Converted Amount: {convertedAmount}
                </motion.div>
            )}
        </motion.div>
    );
};

export default CurrencyConverter;
