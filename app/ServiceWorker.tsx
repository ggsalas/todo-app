"use client";

import { useEffect } from "react";

export function ServiceWorker() {
  useEffect(() => {
    const fn = async () => {
      try {
        let sw = await navigator.serviceWorker.register("/sw.js");
        console.log("Service Worker registered", sw);

        await Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            console.log("Notification permission granted.", permission);
          } else {
            console.log("Notification permission denied.", permission);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    fn();
  }, []);

  useEffect(() => {
    const displaySWNotification = (event: any) => {
      new Notification('title', { body: event.data.msg})
      console.log("notif ", event);
    };

    navigator.serviceWorker?.addEventListener("message", displaySWNotification);

    return () => {
      navigator.serviceWorker?.addEventListener(
        "message",
        displaySWNotification
      );
    };
  }, []);

  return null;
}
