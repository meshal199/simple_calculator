const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

function calculate(num1, num2, op) {
  num1 = Number(num1);
  num2 = Number(num2);

  if (isNaN(num1) || isNaN(num2)) {
    return { error: "num1 and num2 must be numbers" };
  }

  let result;

  switch (op) {
    case "add":
      result = num1 + num2;
      break;
    case "subtract":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    case "divide":
      if (num2 === 0) {
        return { error: "You cannot divide by zero" };
      }
      result = num1 / num2;
      break;
    default:
      return { error: "Invalid operation" };
  }

  return { num1, num2, operation: op, result };
}

app
  .route("/calculate")
  .get((req, res) => {
    if (!req.query) {
      return res
        .status(400)
        .json({ status: "failed", message: "missing some query" });
    }
    const { num1, num2, op } = req.query;

    if (!num1 || !num2 || !op) {
      return res.status(400).json({
        status: "failed",
        message: "Missing query fields",
      });
    }

    const response = calculate(num1, num2, op);

    if (response.error) {
      return res.status(400).json({ status: "failed", error: response.error });
    }

    res.json({ status: "success", ...response });
  })
  .post((req, res) => {
    if (!req.body) {
      return res
        .status(400)
        .json({ status: "failed", message: "missing body" });
    }
    const { num1, num2, op } = req.body;

    if (num1 === undefined || num2 === undefined || !op) {
      return res.status(400).json({
        status: "failed",
        message: "Missing body fields",
      });
    }

    const response = calculate(num1, num2, op);

    if (response.error) {
      return res.status(400).json({ status: "failed", error: response.error });
    }

    res.json({ status: "success", ...response });
  })
  .all((req, res) => {
    res.set("Allow", "GET, POST");
    res.status(405).json({
      status: "failed",
      message: "Method Not Allowed",
    });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`connected on ${PORT}`));
