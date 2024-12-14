import { useDispatch } from "react-redux"
import App from "./App"
import { fetchCart } from "./authapis"
import { useEffect } from "react"
import { setuser } from "./CartComp"


const Routing =  () =>{

  const initialState =localStorage.getItem("authToken") || [];
  
    useEffect(()=>{
      if(initialState){
        console.log("login page",initialState)
      }
    },[]);

    const profile = async () => {
   
      if (!initialState) {
        alert("No auth token found. Please log in.");
        return;
      }
    
      try {
        const res = await fetch('http://localhost:5000/pro/profile', {
          method: 'GET',  
          headers: {
            Authorization: `Bearer ${initialState}`,
          },
        });
        console.log(res)
        if (res.ok) {
          const data = await res.json();
           let _id=data?.profile?._id;  
                  let name = data?.profile?.name;
                  let email = data?.profile?.email;
                  let phonenumber = data?.profile?.phonenumber;
                  console.log(_id,name,email,phonenumber)
                   dispatch(setuser({_id,name,email,phonenumber}))
          // setPro(data);
          console.log('hi here',data)
          // console.log(data)
         
        } else {
          throw new Error("Failed to fetch profile data");
        }
      } catch (error) {
        alert(error.message);
      }
    };
     useEffect(()=>{
        console.log(initialState)
      },[])

      useEffect(() => {
        profile();
    
      }, []); 

   const dispatch = useDispatch()
     
       useEffect(() =>{
         dispatch(fetchCart())
       },[])

    return(
        <App/>
    )
}

export default Routing