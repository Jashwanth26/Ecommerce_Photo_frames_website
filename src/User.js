import React from "react";
import { useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";





export function Username(){

    const[user,setUser]=useState(null);

    useEffect(()=>{

        let x = onAuthStateChanged(auth,(u)=>setUser(u));
        return x;
    },[]);

    return <>{user?.email || "Guest"}</>;;



}