"use client";

import React from "react";
import { ThreeDots  } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full">
        <ThreeDots color="gray" />
    </div>
  )
}

export default Loader;