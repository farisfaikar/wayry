"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SentenceForm from "@/components/sentence-form";

type FormDataType = {
  sentence: string;
  person: string | null;
};

export default function Home() {
  const [formData, setFormData] = useState<FormDataType>({ sentence: "", person: "" });
  const router = useRouter();

  const handleFormSubmit = (data: FormDataType) => {
    setFormData(data);
    router.push(
      `/count?sentence=${encodeURIComponent(data.sentence)}&person=${encodeURIComponent(data.person || "")}`,
    );
  };

  return (
    <main className="mx-auto max-w-2xl p-5">
      <h1 className="mt-10 flex justify-center p-5 text-center text-4xl font-extrabold">
        Why Are You Repeating Yourself?
      </h1>
      <SentenceForm onSubmit={handleFormSubmit} />
    </main>
  );
}
