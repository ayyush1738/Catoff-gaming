import React from "react";
import AddButton from "./AddButton.jsx";


const Navbar = () => {
    return(
        <div className="w-screen p-4 flex ">
            <div className="w-1/2">
                <h2>Logo.</h2>
            </div>
            <div className="w-1/2">
                <div className="float-right flex space-x-4">
                    <AddButton />
                    <AddButton />
                </div>
            </div>
        </div>
    )
}

export default Navbar;