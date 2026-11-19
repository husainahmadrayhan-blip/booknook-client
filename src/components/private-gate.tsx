"use client";
import { useEffect } from "react";
import { usePathname,useRouter } from "next/navigation";
import { useAuthSession } from "@/lib/use-auth-session";
export function PrivateGate({children}:{children:React.ReactNode}) {
 const {data:session,isPending}=useAuthSession();const router=useRouter();const path=usePathname();
 useEffect(()=>{if(!isPending&&!session)router.replace("/login?redirect="+encodeURIComponent(path));},[isPending,session,path,router]);
 if(isPending||!session)return <main className="section loading-state"><span className="spinner"/>Checking your library session…</main>;
 return <>{children}</>;
}
