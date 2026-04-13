import { useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (query === "") {
      setProducts([]);
      return;
    }
    (async () => {
      const resp = await fetch(
        `http://localhost:3333/products?search=${query}`,
      );
      const result = await resp.json();
      setProducts(result);
    })();
  }, [query]);

  console.log(products);

  return (
    <main className="container">
      <div className="wrapper">
        <label htmlFor="query-input">
          <h3>Cerca il prodotto:</h3>
        </label>
        <input
          id="query-input"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
        />
        {open && query && (
          <ul className="tips">
            {products.map((p) => (
              <li
                key={p.id}
                onClick={() => {
                  setQuery(p.name);
                  setOpen(false);
                }}
              >
                {p.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default App;
