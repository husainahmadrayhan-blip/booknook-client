"use client";
import Link from "next/link";
import { useEffect,useState } from "react";
import { useParams,useRouter } from "next/navigation";
import { toast } from "sonner";
import { SiteShell } from "@/components/site-shell";
import { PrivateGate } from "@/components/private-gate";
import { useAuthSession } from "@/lib/use-auth-session";
import { apiFetch } from "@/lib/api";
type Book={_id:string;title:string;author:string;category:string;image:string;description:string;ownerName:string;ownerEmail:string;availableCopies:number;totalCopies:number};
export default function BookDetails(){
 const {id}=useParams<{id:string}>();const router=useRouter();const {data:session}=useAuthSession();
 const [book,setBook]=useState<Book|null>(null),[loading,setLoading]=useState(true),[modal,setModal]=useState(false),[busy,setBusy]=useState(false);
 useEffect(()=>{if(id)apiFetch("/books/"+id).then(setBook).catch(e=>toast.error(e instanceof Error?e.message:"Could not load this book.")).finally(()=>setLoading(false));},[id]);
 async function borrow(){setBusy(true);try{await apiFetch("/borrows",{method:"POST",body:JSON.stringify({bookId:id})});toast.success("Book borrowed! You have 7 days to enjoy it.");setModal(false);setBook(b=>b?{...b,availableCopies:b.availableCopies-1}:b);router.push("/my-borrows");}catch(e){toast.error(e instanceof Error?e.message:"Could not borrow this book.");}finally{setBusy(false);}}
 return <SiteShell><PrivateGate><main className="section">
 {loading?<div className="loading-state"><span className="spinner"/>Finding this book…</div>:!book?<div className="empty-panel"><h2>Book not found.</h2><Link href="/books" className="btn btn-dark">Back to books</Link></div>:<><span className="eyebrow">A CLOSER LOOK</span><div className="detail-layout"><img className="detail-cover" src={book.image} alt={book.title}/><div><span className="category-inline">{book.category}</span><h2>{book.title}</h2><p className="detail-author">by {book.author}</p><p className="detail-description">{book.description}</p><p>Added by <b>{book.ownerName||book.ownerEmail}</b></p><p><b>{book.availableCopies}</b> of {book.totalCopies} copies available</p>{book.availableCopies>0?<button className="btn btn-dark" onClick={()=>setModal(true)}>Borrow this book →</button>:<button className="btn btn-outline" disabled>Not available</button>}</div></div></>}
 </main>
 {modal&&book&&<div className="modal-backdrop"><div className="modal-card"><button className="modal-close" onClick={()=>setModal(false)}>×</button><span className="eyebrow">READY FOR A NEW CHAPTER?</span><h3>Borrow this book</h3><p>Borrowing period: 7 days. Please return it by the due date so another reader can enjoy it.</p><div className="borrow-confirm form-stack"><label>Your name<input readOnly value={session?.user.name||""}/></label><label>Email<input readOnly value={session?.user.email||""}/></label></div><div className="manage-actions"><button className="btn btn-outline" onClick={()=>setModal(false)}>Not now</button><button className="btn btn-dark" disabled={busy} onClick={borrow}>{busy?"Confirming…":"Confirm borrow"}</button></div></div></div>}
 </PrivateGate></SiteShell>;
}
