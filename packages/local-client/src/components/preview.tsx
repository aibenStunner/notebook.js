import { useEffect, useRef } from "react";
import styled from "styled-components";

interface PreviewProps {
  code: string;
  error: string;
}

const html = `
    <html>
    <head>
      <style>html { background-color: white }</style>
    </head>
    <body>
    <div id="root"></div>
    <script>

    const handleError = (err) => {
      const root = document.querySelector('#root');
      root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'; 
      console.log(err);
    };

    window.addEventListener('error', (e) => {
      e.preventDefault();
      handleError(e.error);
    });

    window.addEventListener('message', (event) => {
      try {
      eval(event.data);
      } catch (err) {
        handleError(err);
      }
    }, false);

    </script>
    </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <PreviewWrapper>
      <StyledIFrame
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {error && (
        <PreviewErrorWrapper>
          <h4>Build Error</h4>
          {error}
        </PreviewErrorWrapper>
      )}
    </PreviewWrapper>
  );
};

const PreviewWrapper = styled.div`
  position: relative;
  height: 100%;
  flex-grow: 1;

  .react-draggable-transparent-selection &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    opacity: 0;
  }
`;

const StyledIFrame = styled.iframe`
  height: 100%;
  width: 100%;
`;

const PreviewErrorWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  color: red;
`;

export default Preview;
