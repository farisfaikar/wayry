import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "What do you expect?",
	description: "This isn't that kind of project pal",
};


export default function Login() {
	return (
		<main className="max-w-2xl mx-auto p-5">
			<div className="absolute inset-0 flex items-center justify-center max-w-xl mx-auto -z-10">
				<div className="border-r border-secondary h-20 text-2xl flex items-center p-5">
					418
				</div>
				<p className="p-5 text-sm">Funny that you think this app would gain any amount of user base to warrant a login page.</p>
			</div>
		</main>
	);
}