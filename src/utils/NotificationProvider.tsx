"use client";

import React, { useEffect } from "react";
import { App } from "antd";
import { setNotifyInstances } from "./notify";

export const NotificationProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { message, notification } = App.useApp();

  useEffect(() => {
    setNotifyInstances(message, notification);
  }, [message, notification]);

  return <>{children}</>;
};

export default NotificationProvider;
