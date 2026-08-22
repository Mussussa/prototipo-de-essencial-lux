import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';
import WhatsappModal from './components/WhatsappModal';
import SplashIntro from './components/SplashIntro';

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJpFBjTFOKCIy8LbWVZAvohPrwY9ugfFWyaJJei00b5ylSF5ox1mf_zmErIfffpaYJx2igR_gpSn5z/pub?output=csv";

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

  // Estados de Busca e Filtros
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedSubcategory, setSelectedSubcategory] = useState('Todos');
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch(CSV_URL);
        
        if (!response.ok) throw new Error('Falha ao carregar catálogo');

        const csvText = await response.text();
        const data = parseCSV(csvText);

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

  // Extrai lista única de Categorias
  const categories = useMemo(() => {
    const list = products.map((p) => p.category).filter(Boolean);
    return ['Todos', ...new Set(list)];
  }, [products]);

  // 1. Filtragem combinada: Pesquisa, Categoria e Subcategoria
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = 
        (product.name && product.name.toLowerCase().includes(search.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(search.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesSubcategory = selectedSubcategory === 'Todos' || product.subcategory === selectedSubcategory;
      
      return matchesSearch && matchesCategory && matchesSubcategory;
    });
  }, [products, search, selectedCategory, selectedSubcategory]);

  // 2. Agrupamento Hierárquico: Categoria -> Subcategoria
  const groupedProducts = useMemo(() => {
    return filteredProducts.reduce((acc, product) => {
      const cat = product.category || "Outras Categorias";
      const sub = product.subcategory || "Geral";

      if (!acc[cat]) acc[cat] = {};
      if (!acc[cat][sub]) acc[cat][sub] = [];

      acc[cat][sub].push(product);
      return acc;
    }, {});
  }, [filteredProducts]);

  return (
    <div className="min-h-screen bg-luxDark text-white flex flex-col justify-between">
      <SplashIntro />

      <div>
        <Navbar 
          phoneNumber="258858573868" 
          callPhoneNumber="258877305740"
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
        />
        
        <Hero />

        <main id="catalog" className="max-w-5xl mx-auto px-4 py-6">
          {/* Barra de Pesquisa Integrada */}
          <SearchBar
            search={search}
            setSearch={setSearch}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubcategory={selectedSubcategory}
            setSelectedSubcategory={setSelectedSubcategory}
            categories={categories}
            products={products}
          />

          {/* Skeleton Loading */}
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

          {/* Listagem Renderizada por Categoria e Subcategoria */}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="space-y-10">
              {Object.entries(groupedProducts).map(([categoria, subcategoriasMap]) => (
                <div key={categoria} className="space-y-6 animate-fadeIn">
                  
                  {/* Título da Categoria Principal */}
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg md:text-xl font-bold text-luxGold uppercase tracking-widest">
                      {categoria}
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-luxGold/50 to-transparent"></div>
                  </div>

                  {/* Bloco de Subcategorias pertencentes à Categoria */}
                  {Object.entries(subcategoriasMap).map(([subcategoria, produtosLista]) => (
                    <div key={subcategoria} className="space-y-3 pl-1">
                      
                      {/* Divisor Visual de Subcategoria (exibe quando a subcategoria for especificada) */}
                      {subcategoria !== 'Geral' && (
                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-xs font-semibold text-gray-300 tracking-wide flex items-center gap-1.5">
                            <span className="text-luxGold text-sm">↳</span>
                            {subcategoria}
                          </span>
                          <div className="h-px flex-1 bg-white/10"></div>
                        </div>
                      )}

                      {/* Grelha de Produtos */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {produtosLista.map((product) => (
                          <ProductCard
                            key={product.id || product.name}
                            product={product}
                            onSelectProduct={setSelectedProduct}     
                            onAddToCart={handleAddToCart}            
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Nenhum Produto Encontrado */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="text-center py-12 text-gray-400 space-y-2">
              <p className="text-sm">Nenhum produto encontrado com esses filtros.</p>
              <button
                onClick={() => { 
                  setSearch(''); 
                  setSelectedCategory('Todos'); 
                  setSelectedSubcategory('Todos'); 
                }}
                className="text-xs text-luxGold underline font-medium"
              >
                Limpar todos os filtros
              </button>
            </div>
          )}
        </main>
      </div>

      {selectedProduct && (
        <WhatsappModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          whatsappNumber="258858573868"
          callPhoneNumber="258877305740"
        />
      )}
    </div>
  );
}