import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [sgpas, setSgpas] = useState<Array<number>>(Array(8).fill(null)); // Initialize with null
  const [cgpa, setCgpa] = useState<number | null>(null);
  const [inputError, setInputError] = useState<boolean>(false);

  const handleChange = (index: number, value: string) => {
    const newSgpas = [...sgpas];
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      newSgpas[index] = parsedValue;
      setInputError(parsedValue < 0 || parsedValue > 10); // Set input error flag
    } else {
      newSgpas[index] = null; // Clear invalid input
      setInputError(false); // Clear error flag
    }
    setSgpas(newSgpas);
  };

  const calculateCgpa = () => {
    const validSgpas = sgpas.filter((sgpa) => sgpa !== null); // Filter out null values
    if (validSgpas.length === 8) {
      const [s1, s2, s3, s4, s5, s6, s7, s8] = validSgpas;
      const cgpa = (((s1 + s2) * 20) + ((s3 + s4 + s5 + s6) * 25) + (s7 * 19) + (s8 * 16)) / 175;
      setCgpa(cgpa);
    } else {
      // Handle incomplete input (e.g., show a message)
      console.error('Please enter all SGPA values.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-16 rounded-lg shadow-lg max-w-10xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">CGPA Calculator</h1>
        <div className="grid grid-cols-4 gap-8">
          {sgpas.map((sgpa, index) => (
            <div key={index} className={`p-8 border bg-gray-300 border-gray-300 rounded-lg col-span-2 hover:bg-gray-600 transition duration-200`}>
              <div className='hover:bg-gray-600 hover:text-white'>
                <label className="block bold text-gray-1000 mb-4">
                  Semester {index + 1} SGPA
                </label>
              </div>
              <input
                type="number"
                step="1" // Allow decimal input
                value={sgpa === null ? '' : sgpa}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              {inputError && (
                <p className="text-red-500 text-sm mt-2">Please enter a valid SGPA (0-10).</p>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={calculateCgpa}
          disabled={sgpas.includes(null) || inputError} // Disable button if any input is null or there's an input error
          className={`w-full bg-blue-500 text-white py-4 rounded-lg hover:bg-blue-600 transition duration-200 mt-8 ${inputError ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Calculate CGPA
        </button>
        {cgpa !== null && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold">Your CGPA is: {cgpa.toFixed(2)}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
