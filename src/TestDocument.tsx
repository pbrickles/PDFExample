import {
  Document,
  Font,
  Page,
  StyleSheet,
  Image,
  Text,
  View
} from "@react-pdf/renderer";
import * as React from "react";

import { ApiData } from "./interfaces";

export interface DocumentProps {
  data: Array<ApiData>;
}

export const styles = StyleSheet.create({});
const fontSrc =
  "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,600,600i|Lora:400,400i,700,700i";
Font.register({ family: "Source Sans Pro", src: fontSrc });

const TestDocument: React.FC<DocumentProps> = ({ data }) => {
  const member: ApiData = data[0];
  if (member) {
    return (
      <Document>
        <Page size="A4" style={{ fontfamily: "Source San Pro" }}>
          <View>
            <Text>UserName: {member.login}</Text>
            <Image src={member.avatar_url} />
          </View>
        </Page>
      </Document>
    );
  } else
    return (
      <Document>
        <Page size="A4">
          <View>
            <Text>This Pdf could not be generated</Text>
          </View>
        </Page>
      </Document>
    );
};

export default TestDocument;
