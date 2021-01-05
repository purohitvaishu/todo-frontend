import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "./Theme";
import Header from "./pages/Header";
import Bucket from "./pages/Bucket";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Container
        style={{
          paddingTop: "5%",
          minHeight: "100vh"
        }}
      >
        <Header />
        <Bucket />
      </Container>
    </ThemeProvider>
  );
};

export default App;
