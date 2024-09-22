import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [dropdownSelection, setDropdownSelection] = useState([]);
  const [error, setError] = useState('');

  // Helper function to separate numbers and alphabets
  const separateData = (data) => {
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    // Find highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(a => a === a.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().reverse()[0]] : [];

    return { numbers, alphabets, highestLowercaseAlphabet };
  };

  // Handle JSON input changes
  const handleJsonInput = (e) => {
    setJsonInput(e.target.value);
  };

  // Handle dropdown changes
  const handleDropdownChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setDropdownSelection(selected);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Parse the JSON input
      const parsedInput = JSON.parse(jsonInput);

      // Check if "data" key is present in the parsed JSON
      if (!parsedInput.data) {
        throw new Error('"data" key is missing in JSON input');
      }

      setError('');

      // Process the data (simulate backend logic)
      const { numbers, alphabets, highestLowercaseAlphabet } = separateData(parsedInput.data);

      const response = {
        is_success: true,
        user_id: 'john_doe_17091999',  // Example user ID
        email: 'john@xyz.com',  // Example email
        roll_number: 'ABCD123',  // Example roll number
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet,
        file_valid: false,  // No file handling in this case
      };

      setApiResponse(response);

    } catch (err) {
      setError('Invalid JSON format or missing "data" field');
      setApiResponse(null);
    }
  };

  return (
    <div className="App">
      <h1>BFHL API Frontend</h1>
      
      {/* Input Area */}
      <div>
        <textarea
          placeholder='Enter your JSON input'
          value={jsonInput}
          onChange={handleJsonInput}
          rows={5}
          cols={40}
        />
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {/* Error Display */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Dropdown for selecting what to display */}
      {apiResponse && (
        <div>
          <label>Select what to display: </label>
          <select multiple={true} onChange={handleDropdownChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
          </select>
        </div>
      )}

      {/* Displaying the response based on dropdown */}
      {apiResponse && (
        <div>
          <h3>Response:</h3>
          <ul>
            {dropdownSelection.includes('alphabets') && (
              <li><strong>Alphabets:</strong> {apiResponse.alphabets.join(', ')}</li>
            )}
            {dropdownSelection.includes('numbers') && (
              <li><strong>Numbers:</strong> {apiResponse.numbers.join(', ')}</li>
            )}
            {dropdownSelection.includes('highest_lowercase_alphabet') && (
              <li><strong>Highest Lowercase Alphabet:</strong> {apiResponse.highest_lowercase_alphabet.join(', ')}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
