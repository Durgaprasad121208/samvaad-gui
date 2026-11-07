/**
 * Centralized Notification Utility (InventX Style)
 * ================================================
 * A single-source notification system for the entire application.
 *
 * Usage from any file (no hooks required):
 *   import { notify } from '@/utils/notify';
 *   notify.success('Feedback submitted successfully!');
 *   notify.error('Failed to submit feedback');
 *   notify.warning('Please rate all required questions');
 *   notify.info('New update available');
 *
 * Under the hood, antd's message & notification instances are injected at app root
 * via <NotificationProvider />, so calls work from anywhere —
 * components, service files, async thunks, callbacks, etc.
 */

import React from "react";
import type { MessageInstance } from "antd/es/message/interface";
import type { NotificationInstance } from "antd/es/notification/interface";
export { NotificationProvider } from "./NotificationProvider";

// ---------------------------------------------------------------------------
// Internal references — set once by NotificationProvider
// ---------------------------------------------------------------------------
let messageApi: MessageInstance | null = null;
let notificationApi: NotificationInstance | null = null;

/** Called once from <NotificationProvider /> to wire up the antd instances. */
export function setNotifyInstances(
  msg: MessageInstance,
  ntf: NotificationInstance
) {
  messageApi = msg;
  notificationApi = ntf;
}

// ---------------------------------------------------------------------------
// Options Interfaces
// ---------------------------------------------------------------------------
export interface NotifyOptions {
  /** Duration in seconds (default 3) */
  duration?: number;
  /** Unique key to prevent duplicate toasts */
  key?: string;
  /** Optional description below the title */
  description?: React.ReactNode;
  /** Placement on screen */
  placement?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  /** Optional custom icon */
  icon?: React.ReactNode;
}

export interface RichNotifyOptions {
  /** Duration in seconds (default 3, 0 = sticky) */
  duration?: number;
  /** Unique key */
  key?: string;
  /** Placement on screen */
  placement?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  /** Optional description below the title */
  description?: React.ReactNode;
  /** Optional custom icon */
  icon?: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Direct Toast Messages (antd `message` API - top center)
// ---------------------------------------------------------------------------
export const toast = {
  success(content: string, duration = 3) {
    if (messageApi) {
      messageApi.success(content, duration);
    } else {
      console.log("[Toast Success]", content);
    }
  },
  error(content: string, duration = 4) {
    if (messageApi) {
      messageApi.error(content, duration);
    } else {
      console.error("[Toast Error]", content);
    }
  },
  warning(content: string, duration = 3) {
    if (messageApi) {
      messageApi.warning(content, duration);
    } else {
      console.warn("[Toast Warning]", content);
    }
  },
  info(content: string, duration = 3) {
    if (messageApi) {
      messageApi.info(content, duration);
    } else {
      console.info("[Toast Info]", content);
    }
  },
  loading(content: string, duration = 0, key?: string) {
    return messageApi?.loading({ content, duration, key });
  },
};

import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info as InfoIcon,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Rich Notifications (antd `notification` API - corner cards)
// ---------------------------------------------------------------------------
export const richNotify = {
  success(message: string, opts?: RichNotifyOptions) {
    if (notificationApi) {
      notificationApi.success({
        title: message,
        description: opts?.description,
        duration: opts?.duration ?? 3,
        key: opts?.key,
        placement: opts?.placement ?? "bottomRight",
        className: "samvaad-notification samvaad-notification-success",
        icon:
          opts?.icon ??
          React.createElement(CheckCircle2, {
            size: 22,
            color: "#4BC6C6",
            style: { marginTop: 2, flexShrink: 0 },
          }),
      });
    } else if (messageApi) {
      messageApi.success(message, opts?.duration ?? 3);
    } else {
      console.log("[Notification Success]", message);
    }
  },
  error(message: string, opts?: RichNotifyOptions) {
    if (notificationApi) {
      notificationApi.error({
        title: message,
        description: opts?.description,
        duration: opts?.duration ?? 4,
        key: opts?.key,
        placement: opts?.placement ?? "bottomRight",
        className: "samvaad-notification samvaad-notification-error",
        icon:
          opts?.icon ??
          React.createElement(AlertCircle, {
            size: 22,
            color: "#EF4444",
            style: { marginTop: 2, flexShrink: 0 },
          }),
      });
    } else if (messageApi) {
      messageApi.error(message, opts?.duration ?? 4);
    } else {
      console.error("[Notification Error]", message);
    }
  },
  warning(message: string, opts?: RichNotifyOptions) {
    if (notificationApi) {
      notificationApi.warning({
        title: message,
        description: opts?.description,
        duration: opts?.duration ?? 3.5,
        key: opts?.key,
        placement: opts?.placement ?? "topRight",
        className: "samvaad-notification samvaad-notification-warning",
        icon:
          opts?.icon ??
          React.createElement(AlertTriangle, {
            size: 22,
            color: "#F7A329",
            style: { marginTop: 2, flexShrink: 0 },
          }),
      });
    } else if (messageApi) {
      messageApi.warning(message, opts?.duration ?? 3.5);
    } else {
      console.warn("[Notification Warning]", message);
    }
  },
  info(message: string, opts?: RichNotifyOptions) {
    if (notificationApi) {
      notificationApi.info({
        title: message,
        description: opts?.description,
        duration: opts?.duration ?? 3,
        key: opts?.key,
        placement: opts?.placement ?? "bottomRight",
        className: "samvaad-notification samvaad-notification-info",
        icon:
          opts?.icon ??
          React.createElement(InfoIcon, {
            size: 22,
            color: "#E5B151",
            style: { marginTop: 2, flexShrink: 0 },
          }),
      });
    } else if (messageApi) {
      messageApi.info(message, opts?.duration ?? 3);
    } else {
      console.info("[Notification Info]", message);
    }
  },
};

// ---------------------------------------------------------------------------
// Main `notify` object (InventX signature)
// ---------------------------------------------------------------------------
export const notify = {
  success(content: string, opts?: NotifyOptions) {
    richNotify.success(content, opts as RichNotifyOptions);
  },
  error(content: string, opts?: NotifyOptions) {
    richNotify.error(content, opts as RichNotifyOptions);
  },
  warning(content: string, opts?: NotifyOptions) {
    richNotify.warning(content, opts as RichNotifyOptions);
  },
  info(content: string, opts?: NotifyOptions) {
    richNotify.info(content, opts as RichNotifyOptions);
  },
  loading(content: string, opts?: NotifyOptions) {
    messageApi?.loading({ content, duration: opts?.duration ?? 0, key: opts?.key });
  },
  destroy(key?: string) {
    if (key) {
      messageApi?.destroy(key);
      notificationApi?.destroy(key);
    } else {
      messageApi?.destroy();
      notificationApi?.destroy();
    }
  },
  toast,
};

export default notify;
