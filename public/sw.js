// service-worker.js
self.addEventListener("install", (e) => {
  console.log(e.type);
  self.skipWaiting(); // Always activate updated SW immediately
});

// self.addEventListener("activate", (event) => {
//   console.log("is activated", event.type);
//   const a = self.clients.claim();
//   console.log("a: ", a);
//   event.waitUntil(
//     self.clients.matchAll().then((clients) => {
//       console.log("Number of clients:", clients.length);
//       clients.forEach((client) => {
//         console.log("Hello client:", client);
//         client.postMessage({ msg: "Hello from the service worker!" });
//       });
//     })
//   );
// });

function sendNotification(client, interval) {
  client.postMessage({
    msg: "new notification babe!!!!",
  });

  setTimeout(() => sendNotification(client, interval), interval);
}

self.addEventListener("activate", (event) => {
  self.clients.claim();
  event.waitUntil(
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        sendNotification(client, 1000 * 60);
      });
    })
  );
});
