import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';
import WhatsappModal from './components/WhatsappModal';
import { PRODUCTS } from './data/products';

export default function App() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filtragem ultra rápida em memória
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                            product.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

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
          />

          {/* Grelha de Produtos */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={setSelectedProduct}
                />
              ))}
            </div>
          ) : (
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