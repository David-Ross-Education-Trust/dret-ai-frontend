import React from "react";
import ToolTemplate from "../toolTemplate";

const $003 = () => (
  <ToolTemplate
    agentId="asst_1UapHOvlRnY8SYKyizeXmUcZ"
    title="Lesson Planning Tool"
    description="Generate a full lesson plan by entering the subject, topic, and year group."
    prompts={[
      { name: "subject", label: "Subject", placeholder: "e.g. History" },
      { name: "topic", label: "Topic", placeholder: "e.g. Industrial Revolution" },
      {
        name: "yearGroup",
        label: "Year Group",
        type: "select",
        placeholder: ["Year 7", "Year 8", "Year 9", "Year 10", "Year 11"],
      },
    ]}
  />
);

export default $003;