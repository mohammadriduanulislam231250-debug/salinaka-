import { HeartFilled, DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { ImageLoader } from '@/components/common';
import { displayMoney } from '@/helpers/utils';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeFromWishlist } from '@/redux/actions/wishlistActions';
import { addToBasket } from '@/redux/actions/basketActions';

const UserWishListTab = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const basket = useSelector((state) => state.basket);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (product) => {
    const isInBasketCheck = basket.some((item) => item.id === product.id);
    if (!isInBasketCheck) {
      dispatch(addToBasket(product));
    }
  };

  const isInBasket = (productId) => basket.some((item) => item.id === productId);

  if (!wishlist || wishlist.length === 0) {
    return (
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem',
        }}
      >
        <HeartFilled style={{ fontSize: '6rem', color: '#e8e8e8', marginBottom: '2rem' }} />
        <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>Your Wish List is Empty</h3>
        <p style={{ color: '#888', marginBottom: '2rem', textAlign: 'center' }}>
          Start adding products you love to your wishlist!
        </p>
        <button
          className="button"
          type="button"
          onClick={() => history.push('/shop')}
          style={{ padding: '1rem 3rem' }}
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      <div
        style={{ marginBottom: '2rem', borderBottom: '2px solid #f0f0f0', paddingBottom: '1rem' }}
      >
        <h2 style={{ margin: 0, fontSize: '2.4rem', fontWeight: '600' }}>My Wish List</h2>
        <p style={{ margin: '0.5rem 0 0 0', color: '#888' }}>
          {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '2rem',
        }}
      >
        {wishlist.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #e8e8e8',
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            }}
          >
            {/* Product Image */}
            <div
              style={{
                height: '200px',
                background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => history.push(`/product/${product.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && history.push(`/product/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.name || 'Product'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: '1rem',
                }}
              />
              {/* Remove button overlay */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(product.id);
                }}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: 'none',
                  background: '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#fff1f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff';
                }}
                title="Remove from wishlist"
              >
                <DeleteOutlined style={{ color: '#ff4d4f', fontSize: '16px' }} />
              </button>
            </div>

            {/* Product Details */}
            <div style={{ padding: '1.5rem' }}>
              <p
                style={{
                  margin: '0 0 0.3rem 0',
                  color: '#888',
                  fontSize: '1.2rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {product.brand || 'Brand'}
              </p>
              <h4
                style={{
                  margin: '0 0 1rem 0',
                  fontSize: '1.6rem',
                  fontWeight: '500',
                  color: '#333',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
                onClick={() => history.push(`/product/${product.id}`)}
              >
                {product.name || 'Product Name'}
              </h4>
              <p
                style={{
                  margin: '0 0 1.5rem 0',
                  fontWeight: '700',
                  fontSize: '2rem',
                  color: '#1a1a1a',
                }}
              >
                {displayMoney(product.price || 0)}
              </p>

              <button
                className="button"
                type="button"
                onClick={() => handleAddToCart(product)}
                disabled={isInBasket(product.id)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.3rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  background: isInBasket(product.id) ? '#f0f0f0' : '#1a1a1a',
                  color: isInBasket(product.id) ? '#888' : '#fff',
                  border: 'none',
                  cursor: isInBasket(product.id) ? 'default' : 'pointer',
                }}
              >
                <ShoppingCartOutlined />
                {isInBasket(product.id) ? 'Already in Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserWishListTab;
