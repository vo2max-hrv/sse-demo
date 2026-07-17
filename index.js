const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const MAX_EVENTS = 10;

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html>
<head><title>SSE Demo</title></head>
<body>
  <h2>Live Events:</h2>
  <ul id="events"></ul>
  <script>
    const es = new EventSource("/sse1");
    es.onmessage = (e) => {
      const li = document.createElement("li");
      li.textContent = e.data;
      document.getElementById("events").appendChild(li);
    };
  </script>
</body>
</html>`);
});

app.get("/sse1", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();
  
 
  let count = 0;
  const interval = setInterval(() => {
    count++;
    const message = count % 2 === 0
      ? `event: sse-event\nid: ${count}\ndata: X5O!P%@AP[4\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*\n`
      : `event: sse-event\nid: ${count}\ndata: ${new Date().toISOString()}\n`;
    res.write(`${message}\n`);

    if (count >= MAX_EVENTS) {
      clearInterval(interval);
      res.end();
    }
    
  }, 1000);

  req.on("close", () => clearInterval(interval));
});

app.get("/sse2", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  let count = 0;
  const interval = setInterval(() => {
    count++;
    const message = count % 2 !== 0
      ? "X5O!P%@AP[4\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*"
      : `Event #${count} at ${new Date().toISOString()}`;
    res.write(`${message}\n`);

    if (count >= MAX_EVENTS) {
      clearInterval(interval);
      res.end();
    }
    
  }, 1000);

  req.on("close", () => clearInterval(interval));
});

app.get("/sse3", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  let count = 0;
  const interval = setInterval(() => {
    count++;
    const message = count % 2 !== 0
      ? "X5O!P%@AP[4\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*"
      : `Event #${count} at ${new Date().toISOString()}`;
    res.write(`${message}\n`);
  }, 100);

  req.on("close", () => clearInterval(interval));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
