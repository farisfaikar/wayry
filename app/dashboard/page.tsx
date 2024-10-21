import { Suspense } from 'react';
import { use } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import type { Metadata } from "next";
import SentenceTable from "@/components/sentence-table";
import Loader from "@/components/Loader";

// Server-side action
import { db } from "@/server";
import { auth } from "@/server/auth";
import { users, people } from "@/server/schema";
import { eq } from "drizzle-orm";

export const metadata: Metadata = {
  title: "What the hell are you looking for?",
  description: "These are just a bunch of useless data.",
};

async function getPeopleWithSentences() {
  'use server';
  
  const session = await auth();
  const user = await db.query.users.findFirst({
    where: eq(users.email, session?.user?.email ?? ""),
  });
  
  if (!user) return { error: "User not found" };
  
  const peopleWithSentences = await db.query.people.findMany({
    where: eq(people.userId, user.id),
    with: {
      sentences: true,
    },
  });
  
  if (peopleWithSentences.length === 0) return { success: [] };
  
  return { success: peopleWithSentences };
}

function DashboardContent() {
  const peopleWithSentencesPromise = getPeopleWithSentences();
  const { error, success } = use(peopleWithSentencesPromise);

  if (error) {
    throw new Error(error);
  }

  // Check if success is empty
  if (success && success.length === 0) {
    return (
      <div className="absolute inset-0 flex h-full flex-col items-center justify-center">
        <h2 className="text-xl font-bold">No Sentences Found :(</h2>
        <p className="text-neutral-500">There are currently no sentences available.</p>
        <Button variant="outline" className="mt-2">
          <Link href="/" className="flex items-center gap-2">
            <CirclePlus size={20} />
            Create sentence
          </Link>
        </Button>
      </div>
    );
  }

  if (success) {
    return <SentenceTable people={success} />;
  }

  // This shouldn't be reached due to Suspense, but included for completeness
  return null;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<Loader />}>
      <DashboardContent />
    </Suspense>
  );
}