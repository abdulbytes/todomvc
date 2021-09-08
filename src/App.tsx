import TodoApp from "./features/todo/TodoApp";
import Footer from "./shared/Footer";
import Header from "./shared/Header";
import "./App.css";

const App = () => {
  return (
    <>
      <section className="todoapp">
        <div>
          <Header />
          <TodoApp />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default App;
