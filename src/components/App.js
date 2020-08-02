import React from 'react'
import Routes from "./Routes";
import NavBar from "./NavBar";

const App = (store, history) => {
    return (
        <div >
            <NavBar/>
            <Routes history={history}/>
        </div>
    )
}


export default App