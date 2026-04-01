import { useEffect, useRef, useState } from "react";
import { Pause, Play, VolumeX } from "lucide-react";

const MUSIC_STORAGE_KEY = "royal_lens_music_playing";
const DEFAULT_TRACK = "/music/royal-ambient.mp3";

const MusicFloat = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.localStorage.getItem(MUSIC_STORAGE_KEY) === "true") {
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(MUSIC_STORAGE_KEY, String(isPlaying));
  }, [isPlaying]);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.volume = 0.36;
  }, []);

  const handleTogglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || isUnavailable) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={DEFAULT_TRACK}
        preload="none"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          setIsPlaying(false);
          setIsUnavailable(true);
        }}
      />

      <button
        type="button"
        onClick={handleTogglePlayback}
        disabled={isUnavailable}
        aria-pressed={isPlaying}
        aria-label={
          isUnavailable ? "Background music is unavailable" : isPlaying ? "Pause background music" : "Play background music"
        }
        title={isUnavailable ? "Music unavailable" : isPlaying ? "Pause Music" : "Play Music"}
        className="music-fab ring-focus"
      >
        {isUnavailable ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : isPlaying ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
        <span className="hidden sm:inline">{isUnavailable ? "Music Unavailable" : isPlaying ? "Pause Music" : "Play Music"}</span>
      </button>
    </>
  );
};

export default MusicFloat;
