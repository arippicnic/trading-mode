import React from "react";

import siteMetadata from "@/siteMetadata";
import Toast from "@/components/Toast";

const ToastCom: React.FC = () => {
  return (
    <noscript>
      <Toast>{`${siteMetadata.name} require JavaScript.`}</Toast>
    </noscript>
  );
};

export default ToastCom;
