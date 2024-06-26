/* /context/AppContext.js */

import React from "react";
// create auth context with default value

// set backup default for isAuthenticated if none is provided in Provider
const AppContext = React.createContext(
    {isAuthenticated:true, 
        cart: {items:[], 
        total:0},
        resetCart:()=>{},
        addItem:()=>{},
        removeItem:()=>{},
        user:null, 
        setUser:()=>{}
    });
export default AppContext;