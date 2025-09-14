import { Loader2 } from "lucide-react";
import React from "react";

const LoadingAdmin = () => {
  return (
    <div className="flex justify-center items-center">
      <Loader2 className="size-24  animate-spin" />
    </div>
  );
};

export default LoadingAdmin;
