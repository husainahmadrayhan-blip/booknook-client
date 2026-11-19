import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
export default function NotFound(){return <SiteShell><main className="section not-found"><span className="eyebrow">404 · PAGE NOT FOUND</span><h2>This page wandered off<span className="period">.</span></h2><p>We could not find the page you were looking for. Let us get you back to the shelves.</p><Link href="/" className="btn btn-dark">Back to Home →</Link></main></SiteShell>}
