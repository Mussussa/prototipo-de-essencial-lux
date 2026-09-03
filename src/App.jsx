import React, { useState, useEffect, useMemo } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import ProductCard from "./components/ProductCard";
import WhatsappModal from "./components/WhatsappModal";
import SplashIntro from "./components/SplashIntro";
// 1. Importar o cliente do Sanity (Certifica-te de que criaste o src/sanityClient.js)
import { sanityClient } from "./sanityClient";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados de Busca e Filtros
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedSubcategory, setSelectedSubcategory] = useState("Todos");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
  };

  // 2. Novo useEffect: Busca os produtos diretamente da API do Sanity
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        // Query (GROQ): Pede ao Sanity todos os produtos disponíveis
        const query = `*[_type == "product" && available == true]{
  "_id": _id,
  "id": id,
  "name": name,
  "category": category,
  "subcategory": subcategory,
  "description": description,
  "price": price,
  "badge": badge,
  "available": available,
  "image": image.asset->url
}`;

        const data = await sanityClient.fetch(query);
        setProducts(data);
      } catch (err) {
        console.error("Erro na ligação ao Sanity:", err);
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
    return ["Todos", ...new Set(list)];
  }, [products]);

  // 1. Filtragem combinada: Pesquisa, Categoria e Subcategoria
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        (product.name &&
          product.name.toLowerCase().includes(search.toLowerCase())) ||
        (product.description &&
          product.description.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory =
        selectedCategory === "Todos" || product.category === selectedCategory;
      const matchesSubcategory =
        selectedSubcategory === "Todos" ||
        product.subcategory === selectedSubcategory;

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

  // 3. Ordenação de alta performance baseada na lista personalizada
  const orderedGroupedProducts = useMemo(() => {
    // A tua ordem desejada
    const order = [
      "Camisas",
      "Calças",
      "Relógios",
      "Carteira",
      "Pulseiras",
      "Bolsas",
      "Calçados",
      "Colares",
      "calcões",
    "Meias"

    ];

    const sortedGroups = {};

    // 1º passo: Inserir as categorias exatas na ordem definida
    order.forEach((category) => {
      if (groupedProducts[category]) {
        sortedGroups[category] = groupedProducts[category];
      }
    });

    // 2º passo: Adicionar no final qualquer categoria que venha da base de dados e não esteja na lista
    Object.keys(groupedProducts).forEach((category) => {
      if (!sortedGroups[category]) {
        sortedGroups[category] = groupedProducts[category];
      }
    });

    return sortedGroups;
  }, [groupedProducts]);

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
                <div
                  key={n}
                  className="bg-luxGray/40 border border-white/5 rounded-2xl p-3 animate-pulse h-64 flex flex-col justify-between"
                >
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
              {Object.entries(orderedGroupedProducts).map(
                ([categoria, subcategoriasMap]) => (
                  <div key={categoria} className="space-y-6 animate-fadeIn">
                    {/* Título da Categoria Principal */}
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg md:text-xl font-bold text-luxGold uppercase tracking-widest">
                        {categoria}
                      </h2>
                      <div className="h-px flex-1 bg-gradient-to-r from-luxGold/50 to-transparent"></div>
                    </div>

                    {/* Bloco de Subcategorias pertencentes à Categoria */}
                    {Object.entries(subcategoriasMap).map(
                      ([subcategoria, produtosLista]) => (
                        <div key={subcategoria} className="space-y-3 pl-1">
                          {/* Divisor Visual de Subcategoria (exibe quando a subcategoria for especificada) */}
                          {subcategoria !== "Geral" && (
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
                                key={product._id || product.name} // 3. Usa o ID único gerado pelo Sanity
                                product={product}
                                onSelectProduct={setSelectedProduct}
                                onAddToCart={handleAddToCart}
                              />
                            ))}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                ),
              )}
            </div>
          )}

          {/* Nenhum Produto Encontrado */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="text-center py-12 text-gray-400 space-y-2">
              <p className="text-sm">
                Nenhum produto encontrado com esses filtros.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("Todos");
                  setSelectedSubcategory("Todos");
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
