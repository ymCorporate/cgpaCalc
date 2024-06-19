import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [sgpas, setSgpas] = useState<Array<number | undefined>>(Array(8).fill(undefined)); // Initialize with undefined
  const [cgpa, setCgpa] = useState<number | null>(null);
  const [inputError, setInputError] = useState<boolean>(false);

  const handleChange = (index: number, value: string) => {
    const newSgpas = [...sgpas];
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      newSgpas[index] = parsedValue;
      setInputError(parsedValue < 0 || parsedValue > 10);
    } else {
      newSgpas[index] = undefined; // Use undefined for invalid input
      setInputError(false);
    }
    setSgpas(newSgpas);
  };

  const calculateCgpa = () => {
    if (sgpas.includes(undefined)) {
      console.error('Please enter all SGPA values.');
      return;
    }

    const [s1, s2, s3, s4, s5, s6, s7, s8] = sgpas as number[];
    const cgpa = (((s1 + s2) * 20) + ((s3 + s4 + s5 + s6) * 25) + (s7 * 19) + (s8 * 16)) / 175;
    setCgpa(cgpa);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-16 rounded-lg shadow-lg max-w-10xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">CGPA Calculator</h1>
        <div className="grid grid-cols-4 gap-8">
          {sgpas.map((sgpa, index) => (
            <div key={index} className="p-8 border bg-gray-300 border-gray-300 rounded-lg col-span-2 hover:bg-gray-600 transition duration-200">
              <label className="block bold text-gray-1000 mb-4">
                Semester {index + 1} SGPA
              </label>
              <input
                type="number"
                step="1"
                max="10"
                min="0"
                value={sgpa === undefined ? '' : sgpa}
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
          disabled={sgpas.includes(undefined) || inputError} // Disable button if any input is undefined or there's an input error
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
