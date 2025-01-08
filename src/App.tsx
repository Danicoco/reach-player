/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import SpotifyWebPlayer from "react-spotify-web-playback";

const checkJSEnableed = () => {
  try {
    const script = `
      (function() {
        return 'js-enabled';
      })();
    `;

    const result = eval(script);
    if (result === "js-enabled") {
      return true;
    }
  } catch (error) {
    console.error("JavaScript is restricted:", error);
    return false;
  }
};

const App = () => {
  const audioRef = useRef<any>(null);
  const [error, setError] = useState("");

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const token = params.get("token");
  const uri = params.get("uri");

  useEffect(() => {
    const isJSEnabled = checkJSEnableed();
    if (!isJSEnabled) {
      setError(
        "Javascript is currently disabled. Please enable it for smooth play"
      );
      return;
    }

    if (!token || !uri) {
      setError("Invalid URI");
    }

  }, [token, uri]);

  useEffect(() => {
    // if (audioRef.current) {
    //   audioRef.current.preload = "auto";
    //   audioRef.current.load();
    //   setLoadAudio(true);
    // }
    console.log({ audioRef });
  }, [audioRef]);

 const onGetPlayer = (player: Spotify.Player) => {
  console.log({player});
 }

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
        {error ? (
          <p style={{ color: "red", fontStyle: "italic", textAlign: "center" }}>{error}</p>
        ) : (
          <SpotifyWebPlayer
            token={String(token)}
            uris={String(uri)}
            inlineVolume
            preloadData
            getPlayer={onGetPlayer}
            // name="reach-spotify"
            ref={audioRef}
          />
        )}
      </div>
    </div>
  );
};

export default App;
