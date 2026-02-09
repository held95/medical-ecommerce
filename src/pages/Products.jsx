import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { categories } from '../data/categories';
import { FaShoppingCart, FaStar, FaCheck, FaTag } from 'react-icons/fa';
import './Products.css';

function Products() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const { filterProducts } = useProducts();
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [sortBy, setSortBy] = useState('name');
  const [showExclusiveOnly, setShowExclusiveOnly] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = filterProducts({
      category: selectedCategory !== 'all' ? selectedCategory : null,
      sortBy
    });

    // Apply exclusive filter if needed
    const finalFiltered = showExclusiveOnly
      ? filtered.filter(p => p.exclusive === true)
      : filtered;

    setFilteredProducts(finalFiltered);
  }, [selectedCategory, sortBy, showExclusiveOnly, filterProducts]);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    alert(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Todos os Benefícios</h1>
          <p className="page-subtitle">
            Explore benefícios exclusivos para médicos M&G com descontos de até 30%
          </p>
        </div>

        {/* Filters Card */}
        <div className="filters-card">
          <div className="filters-wrapper">
            <div className="filter-group">
              <label className="filter-label">Categoria:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="all">Todas as Categorias</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Ordenar por:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="name">Nome (A-Z)</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="discount-desc">Maior Desconto</option>
                <option value="rating">Melhor Avaliação</option>
              </select>
            </div>

            <div className="filter-group filter-checkbox">
              <label className="filter-checkbox-label">
                <input
                  type="checkbox"
                  checked={showExclusiveOnly}
                  onChange={(e) => setShowExclusiveOnly(e.target.checked)}
                  className="filter-checkbox-input"
                />
                <span>Apenas Exclusivos</span>
              </label>
            </div>

            <div className="results-count">
              <span className="count-number">{filteredProducts.length}</span>
              <span className="count-label">benefício(s) encontrado(s)</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid-page">
            {filteredProducts.map(product => {
              const savings = product.oldPrice ? (product.oldPrice - product.memberPrice) : 0;

              return (
                <div key={product.id} className="product-card-premium">
                  {/* Badges */}
                  <div className="product-badges">
                    {product.discount > 0 && (
                      <span className="badge-discount">-{product.discount}%</span>
                    )}
                    {product.exclusive && (
                      <span className="badge-exclusive">Exclusivo</span>
                    )}
                    {product.stock === 0 && (
                      <span className="badge-out-of-stock">Esgotado</span>
                    )}
                    {product.stock > 0 && product.stock < 10 && (
                      <span className="badge-low-stock">Últimas unidades</span>
                    )}
                  </div>

                  {/* Partner Logo */}
                  {product.partnerLogo && (
                    <div className="partner-logo-badge">
                      <img
                        src={product.partnerLogo}
                        alt={product.brand}
                        className="partner-logo-img"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  {/* Image */}
                  <Link to={`/benefits/${product.id}`} className="product-image-link">
                    <div className="product-image-container">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="product-content">
                    <span className="product-brand">{product.brand}</span>

                    <Link to={`/benefits/${product.id}`} className="product-title-link">
                      <h3 className="product-title">{product.name}</h3>
                    </Link>

                    {/* Rating */}
                    {product.rating && (
                      <div className="product-rating">
                        <div className="rating-stars">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={i < product.rating ? 'star-filled' : 'star-empty'}
                            />
                          ))}
                        </div>
                        {product.reviewCount && (
                          <span className="rating-count">({product.reviewCount})</span>
                        )}
                      </div>
                    )}

                    {/* Prices */}
                    <div className="product-prices">
                      {product.oldPrice && (
                        <span className="price-old">R$ {product.oldPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      )}
                      <span className="price-member">R$ {product.memberPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>

                      {/* Member Savings */}
                      {savings > 0 && (
                        <div className="price-savings">
                          <FaTag className="savings-icon" />
                          <span className="savings-text">
                            Você economiza: R$ {savings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Stock Status */}
                    {product.stock > 0 && (
                      <div className="product-stock">
                        <FaCheck className="stock-icon" />
                        <span className="stock-text">Disponível</span>
                      </div>
                    )}

                    {/* Installments */}
                    {product.installments && product.memberPrice > 100 && (
                      <div className="product-installments">
                        Em até {product.installments}x de R$ {(product.memberPrice / product.installments).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    )}

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className={`btn-add-to-cart ${product.stock === 0 ? 'disabled' : ''}`}
                    >
                      <FaShoppingCart />
                      {product.stock === 0 ? 'Indisponível' : 'Adicionar ao Carrinho'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3 className="empty-title">Nenhum benefício encontrado</h3>
            <p className="empty-text">
              Tente ajustar os filtros ou escolher outra categoria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSortBy('name');
                setShowExclusiveOnly(false);
              }}
              className="btn btn-primary"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
