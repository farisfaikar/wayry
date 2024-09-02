"use client";

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

export default function About() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    return (
        <main className="max-w-2xl mx-auto p-5">
            <h1 className="text-4xl font-extrabold flex justify-center text-center p-5 mt-10">
                What The Hell Is This App?
            </h1>
            <p className="mt-5">
                Have you ever talked to one of your friends, colleagues, or teachers and wondered, <b>&quot;Why the hell are they repeating those specific sentences a lot?&quot;</b>
            </p>
            <p className="mt-5">
                Are you curious about the frequency at which they say those sentences occasionally?
            </p>
            <p className="mt-5">
                Would you like to track and record how many times they say those words over and over again to embarrass them and make them self-conscious about how they speak?
            </p>
            <p className="mt-5">
                Well, you&apos;ve come to the right place!
            </p>
            <p className="mt-5">
                Introducing, <b>WAYRY!</b> <i>(Short for Why Are You Repeating Yourself)</i>
            </p>
            <p className="mt-5">
                This app is built for the intent purpose of counting how many sentences are repeated by your <s>targets</s> friends to track their speech pattern, collect the data, and analyze them. What an amazing app right? Totally not weird or useless whatsoever!
            </p>
            <p className="mt-10">
                <i>Complimentary video:</i>
            </p>
            <div className="flex justify-center mt-5 relative">
                <video
                    ref={videoRef}
                    src="/videos/you-good-bro.mp4"
                    className="w-full"
                    playsInline
                />
                <button
                    onClick={handlePlayPause}
                    className={`absolute inset-0 flex items-center justify-center bg-black ${isPlaying ? 'bg-opacity-0' : 'bg-opacity-50'} text-white text-6xl font-bold`}
                >
                    {isPlaying ? <Pause size={48} className="opacity-0" /> : <Play size={48} />}
                </button>
            </div>
        </main>
    );
}
