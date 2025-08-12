import { Outlet, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/grid">Arcanos & Diosas</Link>
            </li>
            <li>
              <Link to="/reading">Lectura</Link>
            </li>
            <li>
              <Link to="/about">El proyecto</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>
          © 2025 · Proyecto realizado por Olga Ramírez para el Bootcamp
          Fullstack (Femcoders – Factoría F5).</p>
        <p>Todos los contenidos tienen fines educativos y de divulgación.</p>
      </footer>
    </div>
  );
}

export default App;
