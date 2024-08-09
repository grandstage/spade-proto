import React from "react";
import { SourceCard } from "./cards";
import { ChatStepRelatedContent } from "./chat-types";


interface SourcesProps {
  content: ChatStepRelatedContent[];
}

const Sources = ({ content }: SourcesProps) => {
  return (<div className="grid gap-y-2">
    {
      content.map(({ title, image_url, url, source_name }, index) => (
        <SourceCard
          key={index}
          index={index}
          title={title}
          image_url={image_url}
          url={url}
          source_name={source_name}
        />
      ))
    }
  </div>
  );
};

export default Sources;
