import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteUser, updateUser } from "../../actions/user.js";
import useStyles from "./styles";

const UserProfileForm = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [editing, setEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const [isSignup, setIsSignup] = useState(false); // Add this state

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setEditing(!editing);
  }; // Add this function

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
    setFormValues({
      name: user?.result?.name,
      email: user?.result?.email,
      password: "",
    });
  }, []);

  const handleDeleteUser = async () => {
    try {
      await dispatch(deleteUser(user.result._id));
      history.push("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditUser = () => {
    setEditing(true);
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await dispatch(updateUser(user.result._id, formValues));
      localStorage.setItem("profile", JSON.stringify({ ...data.result }));
      setUser(JSON.parse(localStorage.getItem("profile")));
      setEditing(false);
      setFormValues({
        name: user?.result?.name,
        email: user?.result?.email,
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.paper} elevation={6}>
        <form
          className={classes.form}
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          <Typography variant="h6" style={{ margin: "10px" }}>
            User Profile
          </Typography>
          <TextField
            name="name"
            className={classes.textField}
            variant="outlined"
            label="Name"
            fullWidth
            value={editing ? formValues.name : user?.result.name}
            onChange={handleInputChange}
            disabled={!editing}
          />
          <TextField
            name="email"
            className={classes.textField}
            variant="outlined"
            label="Email"
            fullWidth
            value={editing ? formValues.email : user?.result.email}
            onChange={handleInputChange}
            disabled={!editing}
          />
          <TextField
            name="password"
            className={classes.textField}
            variant="outlined"
            label="New Password"
            fullWidth
            value={formValues.password}
            onChange={handleInputChange}
            type="password"
            placeholder="New Password"
            disabled={!editing}
          />
          {editing ? (
            <>
              <Button
                className={classes.buttonSubmit}
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                fullWidth
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={switchMode}
                style={{ margin: "10px" }}
                fullWidth
              >
                {isSignup ? "edit" : "Cancel"}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleEditUser}
                style={{ margin: "10px" }}
                fullWidth
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleDeleteUser}
                style={{ margin: "10px" }}
                fullWidth
              >
                Delete
              </Button>
            </>
          )}
        </form>
      </Paper>
    </div>
  );
};

export default UserProfileForm;
