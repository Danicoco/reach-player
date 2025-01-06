import { useEffect } from "react";
// import Reason from "./assets/you-are-the-reason.mp3";

const App = () => {
  useEffect(() => {
    function isInWebView() {
      console.log({ user: navigator.userAgent });
      return /wv|Chrome\/[0-9]+/.test(navigator.userAgent);
    }

    console.log(isInWebView());
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        width: "100vw",
      }}
    >
      <audio preload="metadata" controls src="https://res.cloudinary.com/dff3zvx7e/video/upload/v1736113820/hksfyzep4mr1mxaayr7p.mp3" />
    </div>
  );
};

export default App;
