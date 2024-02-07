const http = require("http");
const path = require("path");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-type", "text/html");

    res.write("<html>");
    res.write("<head><title>Assignment 1</title></head>");
    res.write(
      "<body><form action='/create-user' method='POST' ><input type='text' name='username'/><button type='submit'>Submit</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (req.url === "/users") {
    res.setHeader("Content-type", "text/html");
    res.write("<h1>Hello User</h1>");
    res.write("<ol><li>User 1</li><li>User 2</li><li>User 3</li></ol>");
    res.write("<p>That's it</p>");
    return res.end();
  }
  if (req.url === "/create-user") {
    const body = [];
    req.on("data", (chunks) => {
      body.push(chunks);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const name = parsedBody.split("=")[1];
      console.log(name);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  }
});

server.listen(3000, (req, res) => {
  console.log("Server is running on port 3000");
});
