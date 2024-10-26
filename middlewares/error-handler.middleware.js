export default function (err, req, res, next) {
  console.log(err);

  //if error happens in joi validation pass error to the client

  if (err.name === "ValidationError") {
    return res.status(400).json({ errorMessage: err.message });
  }

  //if any other error occurs, treat as server error

  return res
    .status(500)
    .json({ errorMessage: "An error occured on ther server" });
}
