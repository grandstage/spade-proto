import React from "react";

const ProductDescription = () => {
  return (
    <div className="w-full h-[500px] p-8 bg-gray-300 relative rounded-br-xl overflow-hidden">
      <div className="absolute top-8 right-8">
        <span className="inline-block px-2 py-1.5 bg-pink-500 text-white text-sm rounded-md font-medium truncate">
          Challenge
        </span>
      </div>

      <h2 className="text-3xl text-black font-bold mb-12 truncate">
        Automatic Event Tracking
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg text-black font-semibold mb-1">Problem:</h3>
          <p className="text-black text-lg leading-relaxed line-clamp-3 overflow-hidden">
            Mixpanel doesn't allow for retroactive analysis of newly defined
            events, limiting historical insights.
          </p>
        </div>

        <div>
          <h3 className="text-lg  text-black font-semibold mb-1">
            Enhancement:
          </h3>
          <p className="text-black text-lg leading-relaxed line-clamp-3 overflow-hidden">
            Introduce the ability to retroactively analyze data for newly
            created events, similar to Heap's offering.
          </p>
        </div>

        <div>
          <h3 className="text-lg text-black font-semibold mb-1">
            JTBD Statement:
          </h3>
          <p className="text-black text-lg leading-relaxed line-clamp-3 overflow-hidden">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            efficitur diam vitae neque luctus, at scelerisque sapien ultricies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
