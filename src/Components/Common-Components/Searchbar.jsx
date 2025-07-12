import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm); // Call the onSearch function passed as a prop
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <input 
        type="text" 
        className="form-control" 
        placeholder="Search by UserId/ UserCategoryType/ UserName"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress} // Ensure this is correctly bound
        style={{ padding: "0.375rem 2.375rem 0.375rem 0.75rem", width: "200px" }}
      />
      <button 
        className="btn btn-secondary" 
        type="button" 
        onClick={handleSearch}
        style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", border: "none", background: "transparent" , color:"#979799"}} // Adjust styling for button
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}
