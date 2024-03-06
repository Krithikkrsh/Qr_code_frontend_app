import QrProjector from "./QrComponent";
import {useEffect,useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useSharedState } from "./SharedContext";

const MainPage = () => {
    const { state, dispatch } = useSharedState();
    const [listening,setListening] = useState(false);
    const [getQrLink, setLink] = useState(null);
    let eventSource = undefined;
    const navigate = useNavigate();
    const updateState = (data) => {
        const updatedData = data ;
        dispatch({ type: 'UPDATE_STATE', payload: updatedData });
      };
      console.log(state,"main state");
    useEffect(() => {
       if(!listening){
        eventSource = new EventSource("http://localhost:8080/generateQrCode");
        eventSource.onopen = (event) => {
            console.log("connection opened")
        }

        eventSource.onmessage = (event) => {
            setTimeout(() => {
                let resObj = JSON.parse(event.data);
                console.log("result",resObj);
                if(resObj.authStatus == "STARTED"){
                    setLink(resObj.imageName);
                    updateState(resObj.token);
                }
                else if(resObj.authStatus === "SUCCESS"){
                    navigate("/dashboard");
                }
                else{
                    alert("invalid login please try again...");
                }
            },5000);
        }

        eventSource.onerror = (event) => {
            console.log("state ",event.target.readyState)
            if (event.target.readyState === EventSource.CLOSED) {
              console.log('eventsource closed (' + event.target.readyState + ')')
            }
            eventSource.close();
          }

          setListening(true);
       }

    }, [getQrLink]);


    return (
        <>
        <h1> Scan QR to Login</h1>
        {(getQrLink != null) &&
            <QrProjector imageUrl={getQrLink} />
        }
        </>
    )
}

export default MainPage;