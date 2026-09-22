"use client";

import { useEffect, useState } from "react";
import content from "../../data/content.json";
import HeroSection from "../../components/HeroSection";
import MemorySection from "../../components/MemorySection";
import VideoSection from "../../components/VideoSection";
import WishWall from "../../components/WishWall";
import ReasonsLove from "../../components/ReasonsLove";
import LoveLetter from "../../components/LoveLetter";
import MusicPlayer from "../../components/MusicPlayer";
import ProgressDots from "../../components/ProgressDots";
import TimelineConnector from "../../components/TimelineConnector";
import { FloatingHearts } from "../../components/FlowerDecorations";

import VirtualGiftBox from "../../components/VirtualGiftBox";
import AnniversaryCountdown from "../../components/AnniversaryCountdown";
import DarkModeToggle from "../../components/DarkModeToggle";

export default function StoryPage() {
  const [cakeComplete, setCakeComplete] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const allSectionIds = [
    "hero",
    ...content.sections.map((s) => s.id),
    "video-kenangan",
    "reasons-love",
    "wish-wall",
    "love-letter",
    "virtual-gift",
    "countdown"
  ];

  return (
    <main className="relative min-h-screen bg-pink-50 dark:bg-slate-900 transition-colors duration-500">
      <DarkModeToggle />
      <FloatingHearts />
      {cakeComplete && <MusicPlayer url={content.musicUrl} />}
      <ProgressDots sections={allSectionIds} />
      <TimelineConnector sections={content.sections} />

      <HeroSection
        message={content.openingMessage}
        recipientName={content.recipientName}
        onCakeComplete={() => setCakeComplete(true)}
      />

      <div className="relative z-10 pb-8">
        {content.sections.map((section, index) => (
          <MemorySection
            key={section.id}
            id={section.id}
            index={index}
            title={section.title}
            date={section.date}
            description={section.description}
            photos={section.photos}
            flower={section.flower}
          />
        ))}
      </div>

      <VideoSection 
        url={content.video.url} 
        title={content.video.title} 
        description={content.video.description} 
      />

      <ReasonsLove
        reasons={content.reasonsLove}
        recipientName={content.recipientName}
      />

      <WishWall wishes={content.wishWall} />

      <LoveLetter
        title={content.loveLetter.title}
        content={content.loveLetter.content}
        photos={content.loveLetter.surroundingPhotos}
        senderName={content.loveLetter.senderName}
      />

      <VirtualGiftBox gifts={content.giftBox} />

      <AnniversaryCountdown targetDate={content.anniversaryCountdown.date} />
    </main>
  );
}
