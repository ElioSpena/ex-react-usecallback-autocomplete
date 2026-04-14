import { useCallback, useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [query, setQuery] = useState("");

  function debounce(callback, delay) {
    let timer;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(value);
      }, delay);
    };
  }

  const startFetch = useCallback(
    debounce(async (query) => {
      const resp = await fetch(
        `http://localhost:3333/products?search=${query}`,
      );
      const result = await resp.json();
      setProducts(result);
    }, 1000),
    [],
  );

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }
    startFetch(query);
  }, [query]);

  useEffect(() => {
    if (!id) return;

    (async () => {
      const resp = await fetch(`http://localhost:3333/products/${id}`);
      const result = await resp.json();
      setSelectedProduct(result);
    })();
  }, [id]);

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
          }}
        />
        {products.length > 0 && (
          <ul className="tips">
            {products.map((p) => (
              <li
                key={p.id}
                onClick={() => {
                  setQuery("");
                  setId(p.id);
                  setProducts([]);
                }}
              >
                {p.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <ul>
        {selectedProduct && (
          <li key={selectedProduct.id}>
            <h3>{selectedProduct.name}</h3>
            <strong>{selectedProduct.brand}</strong>
            <figure>
              <img src={selectedProduct.image} alt={selectedProduct.name} />
            </figure>
            <p>{selectedProduct.description}</p>
            <p>
              <strong>Price: </strong>
              {selectedProduct.price} €
            </p>
          </li>
        )}
      </ul>
    </main>
  );
}

export default App;
