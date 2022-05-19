import React from "react";

const Loader = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex justify-center items-center">
      <div class="flex items-center justify-center space-x-2 animate-pulse">
        <div class="w-8 h-8 bg-accent rounded-full"></div>
        <div class="w-8 h-8 bg-accent rounded-full"></div>
        <div class="w-8 h-8 bg-accent rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;
