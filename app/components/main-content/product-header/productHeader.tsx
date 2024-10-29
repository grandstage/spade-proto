import React from "react";
import MarketSentimentGraph from "./MarketSentiment";
import RevenuePotentialGraph from "./PotentialRevenueGraph";
import ProductDescription from "./ProductDescription";

function ProductHeader() {
  return (
    <div className="grid grid-cols-3 gap-[5px]">
      <div className="col-span-1">
        <ProductDescription />
      </div>
      <div className="col-span-1">
        <RevenuePotentialGraph />
      </div>
      <div className="col-span-1">
        <MarketSentimentGraph />
      </div>
    </div>
  );
}

export default ProductHeader;
