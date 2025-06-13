import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="section has-text-centered" style={{ minHeight: "100vh", backgroundColor: "#1e1e1e", color: "#ffffff" }}>
      <div className="container">
        <h1 className="title is-size-1 has-text-warning">404</h1>
        <h2 className="subtitle is-size-3">Page introuvable</h2>
        <p className="mb-5">Oups, on dirait que cette page n'existe pas.</p>
        <Link to="/" className="button is-warning is-medium">Retour à l'accueil</Link>
      </div>
    </section>
  );
}

export default NotFound;
