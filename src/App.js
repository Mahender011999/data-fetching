import React, { useState, useEffect } from "react";
import FadeLoader from "react-spinners/FadeLoader";

const URL = "https://jsonplaceholder.typicode.com/users";
function App() {
  const [userdata, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError,setIsError] = useState({status:false,msg:""})

  const fetchUserData = async (apiURL) => {
    setLoading(true);
    setIsError({status:false,msg:""})
    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      setUserData(data);
      setLoading(false);
      setIsError({status:false,msg:''})
      if (response.status===404){
        throw new Error('Data not found')
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      setIsError({status:true,msg: error.message ||'Somthing went wrong,please try again later'})
    }
  };

  useEffect(() => {
    fetchUserData(URL);
  }, []);

  if (loading) {
    return (
      <center>
        <h1>
          <h1 onClick={() => setLoading(!loading)}></h1>
          <FadeLoader color="#36d7b7" 
           speedMultiplier={1}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </h1>
      </center>
    );
  }
  if(isError?.status){
    return(
      <center> 
      <h3 style={{color:'red'}}>{isError?.msg}</h3>
      </center>
    )
  }
  
  return (
    <center>
      <div>
        <h1>Use Effect</h1>
        <ul>
          {userdata.map((eachItem) => {
            const { name, username, email, id } = eachItem;
            return (
              <li key={id}>
                <div>{name}</div>
                <div>{username}</div>
                <div>{email}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </center>
  );
}

export default App;
