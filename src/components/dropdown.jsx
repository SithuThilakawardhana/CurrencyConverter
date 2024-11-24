/* eslint-disable react/prop-types */
import { HiStar } from "react-icons/hi";
import { HiOutlineStar } from "react-icons/hi2";
import { motion } from "framer-motion";

const CurrencyDropdown = ({
    currencies,
    currency,
    setCurrency,
    favorites,
    handleFavorite,
    title = "",
    darkMode,
}) => {
    const isFavorite = (curr) => favorites.includes(curr);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <label htmlFor={title} className="block text-sm font-medium">
                {title}
            </label>
            <div className="mt-1 relative">
                <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className={`w-full p-2 border rounded-md shadow-sm focus:outline-none ${
                        darkMode ? "bg-gray-900 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
                    }`}
                >
                    {favorites.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                    {currencies
                        .filter((c) => !favorites.includes(c))
                        .map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                </select>
                <motion.button
                    onClick={() => handleFavorite(currency)}
                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                >
                    {isFavorite(currency) ? (
                        <HiStar className={darkMode ? "text-yellow-400" : "text-yellow-500"} />
                    ) : (
                        <HiOutlineStar className={darkMode ? "text-white" : "text-gray-700"} />
                    )}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default CurrencyDropdown;
