import { useState } from "react";
import { Play } from "lucide-react";

/*
  Why this approach instead of an autoplaying background iframe:

  An autoplaying YouTube <iframe> loads YouTube's full player bundle, ad
  infrastructure, and tracking scripts the moment the page loads — even if
  nobody ever watches. That's real, measurable lag, especially on mobile.

  This component instead shows just a static thumbnail image (a few KB)
  until the person actually clicks play — only then does the real YouTube
  iframe get created. This is the same "facade" pattern used by libraries
  like lite-youtube-embed, and it's the standard fix for "YouTube embed
  feels laggy."
*/

const YOUTUBE_VIDEO_ID = "Me2mObx6nDk"; // from your unlisted video URL

export default function VideoShowcase() {
    const [playing, setPlaying] = useState(false);

    return (
        <section className="py-24 md:py-32 px-6 md:px-10 max-w-6xl mx-auto" data-testid="video-showcase-section">
            <div className="text-center mb-10">
                <div className="goi-overline mb-4 justify-center flex">See It In Action</div>
                <h2 className="font-display font-black text-4xl sm:text-5xl mb-3">
                    Watch the <span className="text-brand-magenta">experience</span>.
                </h2>
                <p className="text-white/60 max-w-xl mx-auto">
                    A quick look inside Game On India — arcade, VR, bowling, and everything in between.
                </p>
            </div>

            <div
                className="relative aspect-video rounded-3xl overflow-hidden goi-card group cursor-pointer"
                onClick={() => setPlaying(true)}
                data-testid="video-showcase-player"
            >
                {playing ? (
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                        title="Game On India — See it in action"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <>
                        {/* Lightweight thumbnail — YouTube serves this directly, no API key needed */}
                        <img
                            src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                            alt="Game On India video preview"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

                        {/* Play button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="relative flex items-center justify-center w-20 h-20 rounded-full">
                                <span className="absolute inset-0 rounded-full bg-brand-magenta animate-ping opacity-40 [animation-duration:2.2s]" />
                                <span className="relative w-20 h-20 rounded-full bg-brand-magenta flex items-center justify-center shadow-[0_0_40px_-4px_rgba(255,0,85,0.7)] group-hover:scale-110 transition-transform duration-300">
                                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                                </span>
                            </span>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}