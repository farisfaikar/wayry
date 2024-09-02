export default function Navbar() {
	return (
		<nav className="fixed flex justify-center items-center w-full h-12 border-b bg-neutral-950/50 backdrop-blur-md border-neutral-700">
			<div className="flex items-center gap-10 justify-between max-w-2xl w-full p-5">
				<a href="/">WAYRY</a>
				<div className="flex gap-10">
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