"use client";
import { SiteShell } from "@/components/site-shell";
import { PrivateGate } from "@/components/private-gate";
import { useAuthSession } from "@/lib/use-auth-session";
export default function MyProfile(){const {data:session}=useAuthSession();return <SiteShell><PrivateGate><main className="section"><span className="eyebrow">YOUR BOOKNOOK ACCOUNT</span><h2>My profile<span className="period">.</span></h2><div className="profile-panel"><img src={session?.user.image||"https://ui-avatars.com/api/?name=Reader"} alt="Profile"/><div><h3>{session?.user.name}</h3><p>{session?.user.email}</p><span className="category-inline">BookNook reader</span></div></div></main></PrivateGate></SiteShell>}
