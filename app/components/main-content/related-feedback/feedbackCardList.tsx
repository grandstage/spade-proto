import React from "react";
import FeedbackCard from "./feedbackCard";
import { feedbackCardsData } from "./feedbackData";
import { FeedbackCardData } from "./types";
import FilteredFeedbackGrid from "./filteredfeedbackGrid";

const FeedbackCardList = (): JSX.Element => {
  return (
    <div className="">
      <FilteredFeedbackGrid feedbackData={feedbackCardsData} />
    </div>
  );
};

export default FeedbackCardList;
