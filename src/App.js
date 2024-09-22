import React, { useState } from "react";
import axios from "axios";

function App() {
    const [jsonData, setJsonData] = useState("");
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (event) => {
        setJsonData(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const payload = JSON.parse(jsonData);
            const res = await axios.post("https://bajajtest-27ae.onrender.com/bfhl", payload);
            console.log(res.data);
            setResponse(res.data);
            setSelectedOptions([]);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleOptionChange = (event) => {
        const options = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedOptions(options);
    };

    return (
        <div className="App" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <header className="App-header" style={{ textAlign: "center" }}>
                <h1>{"AP21110011475"}</h1>
                <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
                    <textarea
                        value={jsonData}
                        onChange={handleChange}
                        placeholder='Enter JSON data: {"data": ["A","C","z"]}'
                        rows={4}
                        cols={50}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            marginTop: "10px",
                            fontSize: "16px",
                            resize: "none"
                        }}
                    />
                    <br />
                    <button
                        type="submit"
                        style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginTop: "10px",
                            fontSize: "16px"
                        }}
                    >
                        Submit
                    </button>
                </form>
                {response && (
                    <div style={{ marginTop: "20px" }}>
                        <select
                            multiple
                            value={selectedOptions}
                            onChange={handleOptionChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                fontSize: "16px",
                                marginTop: "10px"
                            }}
                        >
                            <option value="alphabets">Alphabets</option>
                            <option value="numbers">Numbers</option>
                            <option value="highest_alphabet">Highest Alphabet</option>
                        </select>
                        <br />
                        <br />
                        <div style={{ marginTop: "20px" }}>
                            {selectedOptions.includes("alphabets") && (
                                <div>
                                    <h3>Alphabets:</h3>
                                    <pre style={{ backgroundColor: "#f8f9fa", padding: "10px", borderRadius: "5px" }}>
                                        {JSON.stringify(response.alphabets, null, 2)}
                                    </pre>
                                </div>
                            )}
                            {selectedOptions.includes("numbers") && (
                                <div>
                                    <h3>Numbers:</h3>
                                    <pre style={{ backgroundColor: "#f8f9fa", padding: "10px", borderRadius: "5px" }}>
                                        {JSON.stringify(response.numbers, null, 2)}
                                    </pre>
                                </div>
                            )}
                            {selectedOptions.includes("highest_alphabet") && (
                                <div>
                                    <h3>Highest Alphabet:</h3>
                                    <pre style={{ backgroundColor: "#f8f9fa", padding: "10px", borderRadius: "5px" }}>
                                        {JSON.stringify(response.highest_alphabet, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;