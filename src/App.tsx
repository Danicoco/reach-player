/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
// import Reason from "./assets/you-are-the-reason.mp3";

const checkJSEnableed = () => {
  try {
    const script = `
      (function() {
        return 'js-enabled';
      })();
    `;

    const result = eval(script);
    if (result === 'js-enabled') {
      return true;
    }
  } catch (error) {
    console.error("JavaScript is restricted:", error);
    return false;
  }
};

const App = () => {
  const audioRef = useRef<any>(null);
  const [error, setError] = useState('');

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const src = params.get("src");

  useEffect(() => {
   const isJSEnabled = checkJSEnableed();
   if (!isJSEnabled) {
    setError("Javascript is currently disabled. Please enable it for smooth play");
   }

  }, []);

  const onEnded = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const onError = (event: React.SyntheticEvent<HTMLAudioElement, Event>): void => {
    const audio = event.currentTarget;
    const error = audio.error;

    const codes = {
      MEDIA_ERR_ABORTED: "Audio playback was aborted.",
      MEDIA_ERR_NETWORK: "A network error occurred during audio playback.",
      MEDIA_ERR_DECODE: "An error occurred while decoding the audio file.",
      MEDIA_ERR_SRC_NOT_SUPPORTED: "The audio source is not supported."
    } as Record<string, string>

    const getError = Object.keys(codes).find(key => String(key) === String(error?.code));

    if (getError) {
      setError(codes[getError])
    }

    if (!getError && error) {
      setError("An unknown error occurred during audio playback.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        width: "100vw",
      }}
    >
      <div>
      <p style={{ color: 'red', fontStyle: "italic" }}>{error}</p>
      <audio
        ref={audioRef}
        onEnded={onEnded}
        onError={onError}
        crossOrigin="anonymous"
        preload="metadata"
        controls
        src={src || "https://res.cloudinary.com/dff3zvx7e/video/upload/v1736113820/hksfyzep4mr1mxaayr7p.mp3"}
      />
      </div>
    </div>
  );
};

export default App;
