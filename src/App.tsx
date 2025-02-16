import React from "react";
import "./App.css";
import { Container, Typography } from "@mui/material";
import Todo from "./Component/Todo";

const App: React.FC = () => {
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Welcome to My To-Do App
      </Typography>
      <Todo/>
    </Container>
  );
};

export default App;
