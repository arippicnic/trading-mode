import React from "react";

import { siteMeta } from "@services/siteMeta";
import Toast from "@components/Toast";

const ToastCom: React.FC = () => {
  return (
    <noscript>
      <Toast>{`${siteMeta.name} require JavaScript.`}</Toast>
    </noscript>
  );
};

export default ToastCom;
