"use client";
import { useEffect,useState } from "react";
import { authClient } from "@/lib/auth-client";
type AuthSession={user:{id:string;name:string;email:string;image?:string|null}};
export function useAuthSession(){
 const [state,setState]=useState<{data:AuthSession|null;isPending:boolean}>({data:null,isPending:true});
 useEffect(()=>{let active=true;authClient.getSession().then(result=>{if(active)setState({data:(result.data as AuthSession|null)??null,isPending:false});}).catch(()=>{if(active)setState({data:null,isPending:false});});return()=>{active=false;};},[]);
 return state;
}
