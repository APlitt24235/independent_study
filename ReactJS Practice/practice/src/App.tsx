import * as React from "react";
import "./styles.css";
import axios from "axios";

//Axios Example code:
/* axios.get("/user?ID=12345")
    .then (function (response) {
        //handle success
        console.log(response);
    })
    .catch (function (error) {
        //handle error
        console.log(error);
    })
    .then (function () {
        //always executed
    }); 
*/

const {useState, useEffect} = React;

interface UserName {
    first : string;
    last : string;
    title : string;
};

interface UserPicture {
    thumbnail : string;
};

interface UserInfo {
    name : UserName;
    picture : UserPicture;
};

const fetchRandomData = () => {
    return axios.get("https://randomuser.me/api")
        .then (({data}) => {
            //handle success
            console.log(data);
            return data;
        })
        .catch (err => {
            //handle error
            console.error(err);
        });
};

const getFullUserName = (userInfo : UserInfo) => {
    const {name: {first, last}} = userInfo;
    return `${first} ${last}`;
}

export default function App() {
    const [counter, setCounter] = useState(0);
    const [userInfos, setUserInfos] = useState<any>([]);
    const [randomUserDataJSON, setRandomUserDataJSON] = useState("");
    useEffect(() => {
        fetchRandomData().then((randomData) => {
            setRandomUserDataJSON(JSON.stringify(randomData, null, 2) || "No user data found.");
            setUserInfos(randomData.results);
        });
    }, []);
    return (
        <div className="App">
            <h1>Hello!</h1>
            <h2>This is where the magic happens!</h2>
            <p>{counter}</p>
            <button onClick={() => {
                setCounter(counter + 1);
            }}>Increase Counter</button>
            {
                userInfos.map((userInfo : UserName, idx : number) => (
                    <div key="idx">
                        <p>{getFullUserName(userInfo)}</p>
                        <img src={userInfo.picture.thumbnail}/>
                    </div>
                ))
            }
            <pre>{randomUserDataJSON}</pre>
        </div>
    );
};