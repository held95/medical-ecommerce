import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { categories } from '../data/categories';
import { FaShoppingCart, FaStar, FaCheck } from 'react-icons/fa';
import './Products.css';

function Products() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const { filterProducts } = useProducts();
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [sortBy, setSortBy] = useState('name');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = filterProducts({
      category: selectedCategory !== 'all' ? selectedCategory : null,
      sortBy
    });
    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy, filterProducts]);

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
          <h1 className="page-title">Nossos Produtos</h1>
          <p className="page-subtitle">
            Encontre os melhores equipamentos médicos para sua necessidade
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
                <option value="rating">Melhor Avaliação</option>
              </select>
            </div>

            <div className="results-count">
              <span className="count-number">{filteredProducts.length}</span>
              <span className="count-label">produto(s) encontrado(s)</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid-page">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card-premium">
                {/* Badges */}
                <div className="product-badges">
                  {product.discount > 0 && (
                    <span className="badge-discount">-{product.discount}%</span>
                  )}
                  {product.stock === 0 && (
                    <span className="badge-out-of-stock">Esgotado</span>
                  )}
                  {product.stock > 0 && product.stock < 10 && (
                    <span className="badge-low-stock">Últimas unidades</span>
                  )}
                </div>

                {/* Image */}
                <Link to={`/products/${product.id}`} className="product-image-link">
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

                  <Link to={`/products/${product.id}`} className="product-title-link">
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
                      <span className="price-old">R$ {product.oldPrice.toFixed(2)}</span>
                    )}
                    <span className="price-current">R$ {product.price.toFixed(2)}</span>

                    {/* PIX Discount */}
                    {product.price > 0 && (
                      <div className="price-pix">
                        <span className="pix-badge">PIX</span>
                        <span className="pix-price">R$ {(product.price * 0.95).toFixed(2)}</span>
                        <span className="pix-label">(5% OFF)</span>
                      </div>
                    )}
                  </div>

                  {/* Stock Status */}
                  {product.stock > 0 && (
                    <div className="product-stock">
                      <FaCheck className="stock-icon" />
                      <span className="stock-text">Em estoque</span>
                    </div>
                  )}

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className={`btn-add-to-cart ${product.stock === 0 ? 'disabled' : ''}`}
                  >
                    <FaShoppingCart />
                    {product.stock === 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3 className="empty-title">Nenhum produto encontrado</h3>
            <p className="empty-text">
              Tente ajustar os filtros ou escolher outra categoria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSortBy('name');
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
