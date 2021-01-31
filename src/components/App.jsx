import  React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
    const [clientData, setClientData] = useState([]); 
    const [loading, setLoading] = useState(true); 




    const populateClientData = async () => { /*Populates response with API*/
        const response = await axios.get('https://api.hatchways.io/assessment/students');
        setClientData(response.data);
        setLoading(false);
    }

    useEffect(() => { /*Prevent useEffect From Running Every Render*/
        populateClientData();
    }, [loading]);

    return(
        <>{console.log(clientData)}
        </>
    );
}
export default App;