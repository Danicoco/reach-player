import { useEffect, useState } from "react";
import SpotifyWebPlayer, { CallbackState } from "react-spotify-web-playback";

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

  const callback = (v: CallbackState) => {
    if (v.status === "READY" && v.type === "preload_update" && !v.track.id) {
      setError("INVALID URI");
      return;
    }

    if (
      v.status === "READY" &&
      v.type === "preload_update" &&
      v.isUnsupported
    ) {
      setError("Browser is not supported");
      return;
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
        {error ? (
          <p style={{ color: "red", fontStyle: "italic", textAlign: "center" }}>
            {error}
          </p>
        ) : (
          <SpotifyWebPlayer
            name="Reach Player"
            token={String(token)}
            uris={`spotify:track:${uri}`}
            inlineVolume
            syncExternalDevice
            hideCoverArt
            hideAttribution
            initialVolume={95}
            showSaveIcon={false}
            preloadData
            magnifySliderOnHover
            layout="responsive"
            callback={callback}
          />
        )}
      </div>
    </div>
  );
};

export default App;
