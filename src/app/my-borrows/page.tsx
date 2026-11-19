"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { SiteShell } from "@/components/site-shell";
import { PrivateGate } from "@/components/private-gate";
import { apiFetch } from "@/lib/api";
type Borrow={_id:string;bookTitle:string;bookImage:string;borrowDate:string;returnDate:string};
export default function MyBorrows(){
 const [items,setItems]=useState<Borrow[]>([]),[loading,setLoading]=useState(true),[busy,setBusy]=useState<string|null>(null);
 async function load(){try{setItems(await apiFetch("/borrows") as Borrow[]);}catch(e){toast.error(e instanceof Error?e.message:"Could not load your borrows.");}finally{setLoading(false);}}
 useEffect(()=>{const task=window.setTimeout(()=>{void load();},0);return()=>window.clearTimeout(task);},[]);
 async function giveBack(id:string){setBusy(id);try{await apiFetch("/borrows/"+id,{method:"DELETE"});setItems(v=>v.filter(x=>x._id!==id));toast.success("Book returned. Thank you!");}catch(e){toast.error(e instanceof Error?e.message:"Could not return this book.");}finally{setBusy(null);}}
 return <SiteShell><PrivateGate><main className="section"><span className="eyebrow">YOUR READING LIST</span><h2>My borrows<span className="period">.</span></h2><p>Keep track of the books you borrowed and when they are due.</p>
 {loading?<div className="loading-state"><span className="spinner"/>Loading your borrows…</div>:items.length?<div className="table-wrap"><table className="borrow-table"><thead><tr><th>Book</th><th>Borrow date</th><th>Return date</th><th>Action</th></tr></thead><tbody>{items.map(b=><tr key={b._id}><td><div className="table-book"><img src={b.bookImage} alt=""/><b>{b.bookTitle}</b></div></td><td>{new Date(b.borrowDate).toLocaleDateString()}</td><td>{new Date(b.returnDate).toLocaleDateString()}</td><td><button className="btn btn-dark" disabled={busy===b._id} onClick={()=>giveBack(b._id)}>{busy===b._id?"Returning…":"Return book"}</button></td></tr>)}</tbody></table></div>:<div className="empty-panel"><h3>No borrowed books right now.</h3><p>Find a book and start your next chapter.</p><Link className="btn btn-dark" href="/books">Browse books</Link></div>}
 </main></PrivateGate></SiteShell>;
}
