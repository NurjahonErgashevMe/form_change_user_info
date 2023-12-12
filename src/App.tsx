import Routes from "./utils/routes/routes";
import "./App.scss";
import Container from "./components/Container/Container";
function App() {
  return (
    <main className="main">
      <div className="wrapper">
        <Container classNames="container">
          <Routes />
        </Container>
      </div>
    </main>
  );
}

export default App;
