function Loader() {
  return (
    <div className="has-text-centered" style={{ padding: "2rem", color: "#fffa7c" }}>
      <span className="loader is-loading" style={{ border: "4px solid #fffa7c", borderTopColor: "transparent", borderRadius: "50%", width: "40px", height: "40px", display: "inline-block", animation: "spin 1s linear infinite" }}></span>
      <p className="mt-3">Chargement en cours...</p>

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default Loader;
