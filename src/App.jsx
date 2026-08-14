import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';
import WhatsappModal from './components/WhatsappModal';

// Link direto de exportação CSV da sua tabela publicada
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJpFBjTFOKCIy8LbWVZAvohPrwY9ugfFWyaJJei00b5ylSF5ox1mf_zmErIfffpaYJx2igR_gpSn5z/pub?output=csv";

// Função nativa para converter o texto CSV do Google num Array de Objetos JSON
function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
  if (lines.length < 2) return [];

  const parseLine = (line) => {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(cur.trim().replace(/^"|"$/g, ''));
        cur = '';
      } else {
        cur += char;
      }
    }
    result.push(cur.trim().replace(/^"|"$/g, ''));
    return result;
  };

  const headers = parseLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = parseLine(line);
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = values[i] !== undefined ? values[i] : '';
    });
    return obj;
  });
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch(CSV_URL);
        
        if (!response.ok) {
          throw new Error('Falha ao carregar catálogo');
        }

        const csvText = await response.text();
        const data = parseCSV(csvText);

        // Filtrar apenas produtos disponíveis
        const activeProducts = data.filter(
          (p) => !p.available || String(p.available).toUpperCase() === 'TRUE'
        );

        setProducts(activeProducts);
      } catch (err) {
        console.error('Erro na ligação ao Google Sheets:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Extrai as categorias dinamicamente
  const categories = useMemo(() => {
    const list = products.map((p) => p.category).filter(Boolean);
    return ['Todos', ...new Set(list)];
  }, [products]);

  // Filtragem em memória
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = 
        (product.name && product.name.toLowerCase().includes(search.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(search.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  return (
    <div className="min-h-screen bg-luxDark text-white flex flex-col justify-between">
      <div>
        <Navbar phoneNumber="244900000000" />
        <Hero />

        {/* Secção do Catálogo */}
        <main id="catalog" className="max-w-5xl mx-auto px-4 py-6">
          <SearchBar
            search={search}
            setSearch={setSearch}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />

          {/* Skeleton Screen enquanto carrega */}
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-luxGray/40 border border-white/5 rounded-2xl p-3 animate-pulse h-64 flex flex-col justify-between">
                  <div className="w-full h-32 bg-white/5 rounded-xl mb-2" />
                  <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-white/5 rounded w-1/2" />
                </div>
              ))}
            </div>
          )}

          {/* Estado de Erro */}
          {error && !loading && (
            <div className="text-center py-12 text-red-400 space-y-2">
              <p className="text-sm">Não foi possível carregar os produtos.</p>
              <button 
                onClick={() => window.location.reload()}
                className="text-xs text-luxGold underline font-medium"
              >
                Tentar novamente
              </button>
            </div>
          )}

          {/* Grelha de Produtos */}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id || product.name}
                  product={product}
                  onSelectProduct={setSelectedProduct}
                />
              ))}
            </div>
          )}

          {/* Nenhum produto encontrado */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="text-center py-12 text-gray-400 space-y-2">
              <p className="text-sm">Nenhum produto encontrado.</p>
              <button
                onClick={() => { setSearch(''); setSelectedCategory('Todos'); }}
                className="text-xs text-luxGold underline font-medium"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Modal do WhatsApp */}
      {selectedProduct && (
        <WhatsappModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          phoneNumber="244900000000"
        />
      )}
    </div>
  );
}