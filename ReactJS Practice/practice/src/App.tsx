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

const {useState} = React;

const fetchRandomData = () => {
    return axios.get("https://randomuser.me/api")
        .then (res => {
            //handle success
            console.log(res);
            return res;
        })
        .catch (err => {
            //handle error
            console.error(err);
        });
};

export default function App() {
    const [counter, setCounter] = useState(0);
    return (
        <div className="App">
            <h1>Hello!</h1>
            <h2>This is where the magic happens!</h2>
            <p>{counter}</p>
            <button onClick={() => {
                setCounter(counter + 1);
            }}>Increase Counter</button>
            <button onClick={() => {
                fetchRandomData();
            }}>Fetch Random Date</button>
        </div>
    );
};