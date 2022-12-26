const express = require("express");
const app = express();
const PORT = 4000;

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const fileUpload = require("express-fileupload");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileUpload());

let courses = [
  {
    id: "11",
    name: "Learn Reactjs",
    price: 299,
  },
  {
    id: "22",
    name: "Learn Angularjs",
    price: 399,
  },
  {
    id: "33",
    name: "Learn Django",
    price: 499,
  },
];

app.get("/", (req, res) => {
  res.send("Hello from LCO");
});

app.get("/api/v1/lco", (req, res) => {
  res.send("Hello from LCO Docs");
});

app.get("/api/v1/lcoobject", (req, res) => {
  res.send({ id: "55", name: "Learn Code Online", price: 999 });
});

app.get("/api/v1/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/v1/mycourse/:courseId", (req, res) => {
  const myCourse = courses.find((course) => course.id === req.params.courseId);
  res.send(myCourse);
});

app.post("/api/v1/addcourse", (req, res) => {
  console.log(req.body);
  courses.push(req.body);
  res.send(true);
});

app.get("/api/v1/coursequery", (req, res) => {
  let location = req.query.location;
  let device = req.query.device;

  res.send({ location, device });
});

app.post("/api/v1/courseupload", (req, res) => {
  console.log(req.headers);
  const file = req.files.file;
  let path = __dirname + "/images/" + Date.now() + ".jpg";

  file.mv(path, (err) => {
    res.send(true);
  });
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running at port http://localhost:${PORT}`);
});
