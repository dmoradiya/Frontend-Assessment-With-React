import  React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/main.css";

const App = () => {
    const [clientData, setClientData] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [searchValue, setSearchValue] = useState(''); 

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
                    </div>                    
                </section>
                )}
           </section>
        );
    }



    function handleFieldChange(event) { /*Updates the constant values with whatever is located in the input fields*/
        switch (event.target.id) {
            case "search-by-name-input":
                setSearchValue(event.target.value);
                break;               
            default:
                break;
            }
    }


    const populateClientData = async () => { /*Populates response with API*/
        const response = await axios.get('https://api.hatchways.io/assessment/students');
        setClientData(response.data);
        setLoading(false);
    }

    useEffect(() => { /*Prevent useEffect From Running Every Render*/
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