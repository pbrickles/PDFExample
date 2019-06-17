import * as React from "react";
import { render } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faFile } from "@fortawesome/free-solid-svg-icons";

import PdfDocument from "./PdfDocument";
import TestDocument from "./TestDocument";

import { ApiData } from "./interfaces";

import "./styles.css";

function App() {
  const { useState } = React;

  const initialData: Array<ApiData> | undefined = undefined;

  const [requested, setRequested] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [data, setData] = useState(initialData);

  const requestDataUrl = "https://api.github.com/users";

  const fetchData = async () => {
    setRequested(true);
    setRequesting(true);
    let response = await fetch(requestDataUrl);
    let responseData: Array<ApiData> | undefined = await response.json();
    setData(responseData);
    setRequesting(false);
  };

  return (
    <div className="App">
      <p>
        {!requested && !requesting && (
          <span className="clickable" onClick={() => fetchData()}>
            <FontAwesomeIcon icon={faFile} />
            Request this document
          </span>
        )}
        {requesting && (
          <span>
            <FontAwesomeIcon icon={faSpinner} spin />
            retrieving document...
          </span>
        )}
        {data && requested && (
          <PdfDocument
            title="Cost Disclosure Document"
            document={<TestDocument data={data} />}
          />
        )}
      </p>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
