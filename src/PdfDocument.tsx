import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BlobProvider } from "@react-pdf/renderer";
import { faSpinner, faFile } from "@fortawesome/free-solid-svg-icons";

export interface PdfDocumentProps {
  title: string;
  document: JSX.Element;
}

const PdfDocument: React.FC<PdfDocumentProps> = ({ title, document }) => {
  const { useState, useEffect } = React;
  const [ready, setReady] = useState(false);

  // this is hacky but helps set the render to the back of event queue https://github.com/diegomura/react-pdf/issues/420
  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 0);
  }, []);
  // end of hacky stuff

  if (!ready) {
    return null;
  } else {
    return (
      <BlobProvider document={document}>
        {({ url, loading, blob }) => {
          if (loading) {
            return (
              <span>
                <FontAwesomeIcon icon={faSpinner} spin />
                generating document...
              </span>
            );
          }
          if (!loading && url) {
            console.log(url);
            return (
              <a href={url}>
                <FontAwesomeIcon icon={faFile} />
                View '{title}' (PDF)
              </a>
            );
          }
          return null;
        }}
      </BlobProvider>
    );
  }
};

export default PdfDocument;
