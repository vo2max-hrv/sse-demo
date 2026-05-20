const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000; // Railway injects PORT automatically

// Serve a simple HTML client
app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html>
<head><title>SSE Demo</title></head>
<body>
  <h2>Live Events:</h2>
  <ul id="events"></ul>
  <script>
    const es = new EventSource("/sse");
    es.onmessage = (e) => {
      const li = document.createElement("li");
      li.textContent = e.data;
      document.getElementById("events").appendChild(li);
    };
  </script>
</body>
</html>`);
});

// SSE endpoint
app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  let count = 0;
  const interval = setInterval(() => {
    count++;
    //res.write(`data: Event #${count} at ${new Date().toISOString()}\n\n`);
    //res.write(`data: X5O!P%@AP[4\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*\n`);
    res.write(`X5O!P%@AP[4\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*\n`);
  }, 1000);

  // Clean up when client disconnects
  req.on("close", () => clearInterval(interval));
});

// IMPORTANT: bind to 0.0.0.0 for Railway
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
