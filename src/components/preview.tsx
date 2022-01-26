import React, { useEffect, useRef } from "react";

import "./preview.css";

interface PreviewProps {
  code: string;
  error: string | null;
}

const html = `<html>
  <head>
    <style>
      html {
        background-color: #fff;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      function tryParseJSON(jsonString){
        try { return JSON.parse(jsonString); }
        catch(error){ return {}; }
      }
      
      function handleError(error){
        const [type, ...message] = error.replace("Uncaught ", "").split(":");

        const root = document.getElementById("root");
        root.innerHTML = '<div style="color: red;"><h4>' + type + ':</h4>' + message.join(":") + '</div>';
      }

      const handlers = {
        execute_code: eval,
        bundle_error: handleError
      }

      window.addEventListener("message", (event) => {
        const {type, data} = tryParseJSON(event.data);
        handlers[type]?.(data);
      });

      window.addEventListener("error", (event) => handleError(event.message));
    </script>
  </body>
</html>`;

interface PostMessageArgs {
  type: "execute_code" | "bundle_error";
  data: string;
}

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
  const iframe = useRef<any>();

  function postMessage({ type, data }: PostMessageArgs) {
    iframe.current.srcdoc = html;
    return setTimeout(() => {
      const message = JSON.stringify({ type, data });
      iframe.current.contentWindow.postMessage(message, "*");
    }, 50);
  }

  useEffect(() => {
    const timer = postMessage({ type: "execute_code", data: code });

    return () => {
      clearTimeout(timer);
    };
  }, [code]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (error) {
      timer = postMessage({ type: "bundle_error", data: error });
    }

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  return (
    <aside className="preview">
      <iframe
        className="preview__frame"
        srcDoc={html}
        ref={iframe}
        title="preview"
        sandbox="allow-scripts"
      />
    </aside>
  );
};

export default Preview;
