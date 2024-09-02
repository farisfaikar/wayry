"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import CountSentence from '@/components/count-sentence';
import { Button } from '@/components/ui/button';
import { MoveLeft } from 'lucide-react';

export default function CountPage() {
	const searchParams = useSearchParams(); // Using useSearchParams to get URL query parameters
	const sentence = searchParams.get('sentence') || "";
	const person = searchParams.get('person') || "";
	const router = useRouter();

	// Prepare the data object for CountSentence
	const data = {
		sentence,
		person,
	};

	const goToHome = () => {
		router.push("/");
	}

	return (
		<main className="max-w-2xl mx-auto p-5">
      <h1 className="text-4xl font-extrabold flex justify-center text-center p-5 mt-10">
        Why Are You Repeating Yourself?
      </h1>
			<CountSentence data={data}/>
			<Button
				variant="link"
				className="flex gap-2 mt-5"
				onClick={goToHome}
			>
				<MoveLeft /> Back
			</Button>
		</main>
	);
}
