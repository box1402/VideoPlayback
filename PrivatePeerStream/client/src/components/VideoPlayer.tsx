import React, { useEffect, useRef } from "react";
import { useVideoSync } from "@/contexts/VideoSyncContext";
import { Loader2 } from "lucide-react";

interface VideoPlayerProps {
  videoUrl?: string;
  isLoading: boolean;
  isSyncing: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  isLoading,
  isSyncing,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { registerVideoElement, unregisterVideoElement } = useVideoSync();
  
  // Register video element with VideoSyncContext
  useEffect(() => {
    if (videoRef.current) {
      registerVideoElement(videoRef.current);
    }
    
    return () => {
      unregisterVideoElement();
    };
  }, [registerVideoElement, unregisterVideoElement]);

  return (
    <div className="relative w-full aspect-video bg-black">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <Loader2 className="h-10 w-10 text-white animate-spin" />
        </div>
      )}
      
      {isSyncing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
          <div className="text-center text-white">
            <Loader2 className="h-10 w-10 mx-auto animate-spin mb-2" />
            <p className="font-medium">Syncing playback...</p>
          </div>
        </div>
      )}
      
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full"
          controls
          playsInline
          controlsList="nodownload"
        />
      )}
      
      {!videoUrl && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
          <p>No video available</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;