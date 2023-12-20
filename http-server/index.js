const http = require("http");
const fs = require("fs");
const argv = require("minimist")(process.argv.slice(2));

let port = argv.port || 3000;

let homeContent = "";
let projectContent = "";
let registrationcontent = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

fs.readFile("registration.html", (err, registrationpage) => {
  if (err) {
    throw err;
  }
  registrationcontent = registrationpage;
});
const server = http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });

    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;
      case "/registration":
        response.write(registrationcontent);
        response.end();
        break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  server.listen(port, ()=>{
    console.log(`Server is running at http://localhost:/${port}`);

  });