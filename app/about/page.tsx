import VideoPlayer from "@/components/video-player"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Why Did You Bother Reading The About Page?",
  description: "Just why exactly?",
}

export default function AboutPage() {
  return (
    <>
      <h1 className="flex justify-center p-5 text-center text-4xl font-extrabold">
        What The Hell Is This App?
      </h1>
      <p className="mt-5">
        Have you ever talked to one of your friends, colleagues, or teachers and wondered,{" "}
        <b>&quot;Why the hell are they repeating those specific sentences a lot?&quot;</b>
      </p>
      <p className="mt-5">
        Are you curious about the frequency at which they say those sentences occasionally?
      </p>
      <p className="mt-5">
        Would you like to track and record how many times they say those words over and over again
        to embarrass them and make them self-conscious about how they speak?
      </p>
      <p className="mt-5">Well, you&apos;ve come to the right place!</p>
      <p className="mt-5">
        Introducing, <b>WAYRY!</b> <i>(Short for Why Are You Repeating Yourself)</i>
      </p>
      <p className="mt-5">
        This app is built for the intent purpose of counting how many sentences are repeated by your{" "}
        <s>targets</s> friends to track their speech pattern, collect the data, and analyze them.
        What an amazing app right? Totally not weird or useless whatsoever!
      </p>
      <p className="mt-10">
        <i>Complementary video:</i>
      </p>
      <VideoPlayer src="/videos/you-good-bro.mp4" />
    </>
  )
}
