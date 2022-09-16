const doesBrowserSupportNotificationAPI = () => {
  return (
    "Notification" in window &&
    "serviceWorker" in navigator &&
    "PushManager" in window
  );
};

export { doesBrowserSupportNotificationAPI };
