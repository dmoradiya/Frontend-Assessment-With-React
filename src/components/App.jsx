import  React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/main.css";
import { FaPlus, FaMinus } from 'react-icons/fa';

const App = () => {
    const [clientData, setClientData] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [searchValue, setSearchValue] = useState('');
    const [expand, setExpand] = useState([]); 
    const [tag, setTag] = useState([]);
    const [tagValue, setTagValue] = useState('');   

    const renderClientData = (clientData) => {
        return (
           <section id="main-section">
               <div id="search-by-name-wrap">
                    <label id="search-by-name-label" htmlFor="search-by-name">Search By Name</label>
                    <input id="search-by-name-input" type="text" placeholder="Search by name" onChange={handleFieldChange} />
                </div>
                {clientData.students.filter(filterData => {
                    if (searchValue === '') {
                        return filterData
                    }
                    else {
                       return (filterData.firstName.toLowerCase().includes(searchValue.toLowerCase())  ||
                                filterData.lastName.toLowerCase().includes(searchValue.toLowerCase()))  
                    }
                })
                .map(val => 
                <section key={val.id} id="info-section-wrap">
                    <div id="image-wrap">
                         <img id="image" src={val.pic} alt={"Smiley face of "+val.firstName}/>
                    </div>                    
                    <div id="info-wrap">                        
                        <h2>{val.firstName+" "+val.lastName}</h2>                                                                        
                        <p>{"Email : "+val.email}</p>
                        <p>{"Company : "+val.company}</p>
                        <p>{"Skill : "+val.skill}</p>                    
                        <p>{"Average : "+val.grades.map((x,i,arr) => x/arr.length).reduce((a,b) => a + b)+"%"}</p>               
                        {uniqueItems.map(item => (item === val.id) ?                          
                        <div className={clickCounter(expand,val.id) ? "show-results" : "hide-results"} >
                            <p>{"Test 1 : "+val.grades[0]}</p>
                            <p>{"Test 2 : "+val.grades[1]}</p>
                            <p>{"Test 3 : "+val.grades[2]}</p>
                            <p>{"Test 4 : "+val.grades[3]}</p>
                            <p>{"Test 5 : "+val.grades[4]}</p>
                            <p>{"Test 6 : "+val.grades[5]}</p>
                            <p>{"Test 7 : "+val.grades[6]}</p>
                            <p>{"Test 8 : "+val.grades[7]}</p>
                        </div> : null                        
                        )}
                        <div id="tag-name-wrap">
                        {tag.map(item => (item.id === val.id) ?  
                            <p id="tag-name">{item.name}</p>
                            : null                        
                        )}  
                        </div>                     
                        <form onSubmit={submitHandler(val.id)}>
                            <label id="input-add-tag-label" htmlFor="add-tag">Add a tag</label>                                                        
                            <input id="add-tag" type="text" placeholder="Add a tag" onChange={handleFieldChange} />
                        </form>
                    </div>  
                    <p id="expand-view" onClick={testInfo(val.id)}>{clickCounter(expand,val.id)? <FaMinus /> : <FaPlus />}</p>       
                </section>
                )}
           </section>
        );
    }



    function handleFieldChange(event) { // Updates the constant values with whatever is located in the input fields
        switch (event.target.id) {
            case "search-by-name-input":
                setSearchValue(event.target.value);
                break;     
            case "add-tag":
                setTagValue(event.target.value);
                break;             
            default:
                break;
            }
    }

    const testInfo = val => (event) => { // Creates ID array based on onclick event
        event.preventDefault();   
        setExpand([...expand, val]);
        
    }
   
    const uniqueItems = [...new Set(expand)] // Creates Distinct element in new array 
       
    const clickCounter = (arr, val) => { // Count no. of Clicks 
        const number = arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
        if (number % 2 === 0)
        {
            return false
        }
        else
        {
            return true
        }
    }

    const submitHandler = val => (event) => { 
        event.preventDefault(); 
        let tagObj = {
            id: val,
            name: tagValue
        };
        setTag([...tag, tagObj]);       
       
    }

    const populateClientData = async () => { // Populates response with API
        const response = await axios.get('https://api.hatchways.io/assessment/students');
        setClientData(response.data);
        setLoading(false);
    }

    useEffect(() => { // Prevent useEffect From Running Every Render
        populateClientData();
    }, [loading]);

    let contents = loading // Display only data after successful loading 
    ? <h1>Loading...</h1>
    : renderClientData(clientData);
    
    return(
        <section>                  
            {contents}
        </section>
    );
}
export default App;