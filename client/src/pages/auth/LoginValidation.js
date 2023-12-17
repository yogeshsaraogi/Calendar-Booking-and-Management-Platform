function validation(values) {
  let error = {};

  if (values.username === "") {
    error.username = "Invalid Username";
  } else {
    error.username = "";
  }

  if (values.password === "") {
    error.password = "Invalid Password";
  } else {
    error.password = "";
  }

  return error;
}
export default validation;
