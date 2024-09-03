import { badgeVariants } from "@/components/ui/badge";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";

export default function Navbar() {
	return (
		<nav className="fixed flex justify-center items-center w-full h-12 border-b bg-neutral-950/50 backdrop-blur-md border-neutral-700">
			<div className="flex items-center gap-10 justify-between max-w-2xl w-full p-5">
				<div className="flex gap-4 items-center">
					<a href="/">WAYRY</a>
					<Link href="https://farisfaikar.vercel.app" target="_blank" className={`${badgeVariants({ variant: "secondary" })} flex gap-1`}>
						<p className="sm:flex hidden">Made by Faris Faikar</p>
						<MoveUpRight size={16} />
					</Link>
				</div>
				<div className="flex gap-8">
					<a href="/about" className="text-neutral-300">
						About
					</a>
					<a href="/login" className="text-neutral-300">
						Login
					</a>
				</div>
			</div>
		</nav>
	);
}