import React from "react";
import AddButton from "./AddButton";

const Navbar = () => {
    return (
        <div className="w-full p-4 flex ">
            <div className="w-1/2">
                <h2>Logo.</h2>
            </div>
            <div className="w-1/2">
                <div className="flex space-x-4 float-right">
                    <AddButton btnVal="Add Wager" route="/addWager" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
