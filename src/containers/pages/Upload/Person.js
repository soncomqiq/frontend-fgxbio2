import React from "react";
import DraggerUpload from "../../../components/upload/DraggerUpload";

function Person() {
  return <DraggerUpload uploadUrl="/files/person" uploadTopic="Upload Person Data" />;
}

export default Person;
