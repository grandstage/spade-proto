import React from "react";
import ProductHeader from "./product-header/productHeader";
import FeedbackCardList from "./related-feedback/feedbackCardList";

function ContentWrapper() {
  return (
    <div
      className="absolute bg-white overflow-y-auto top-[80px] left-[108px] h-full"
      style={{
        width: "calc(100% - 108px)",
        height: "calc(100% - 80px)",
      }}
    >
      <ProductHeader />
      <FeedbackCardList />
    </div>
  );
}

export default ContentWrapper;
