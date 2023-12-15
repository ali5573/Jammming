import React, { useState } from "react";
import "./SearchBar.css"

const SearchBar=(props)=> {
    const [term, setTerm]=useState("");
    const search =()=> props.onSearch(term);
    const handleTermChange =(e)=>setTerm(e.target.value);
        return (
            <div className="SearchBar">
                <input placeholder="Enter a song, Artist or Album" onChange={handleTermChange}></input>
                <button className="SearchButton" onClick={search} >Search</button>
            </div>
        );
    
}
export default SearchBar;