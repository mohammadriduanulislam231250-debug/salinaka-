import { ShoppingOutlined, LoadingOutlined, CheckCircleFilled } from '@ant-design/icons';
import { ImageLoader } from '@/components/common';
import { displayMoney, displayDate } from '@/helpers/utils';
import firebase from '@/services/firebase';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const UserOrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth?.id) {
        setLoading(false);
        return;
      }
      try {
        const snapshot = await firebase.getOrders(auth.id);
        const fetchedOrders = [];
        snapshot.forEach((doc) => {
          fetchedOrders.push({ id: doc.id, ...doc.data() });
        });
        // Sort by createdAt descending
        fetchedOrders.sort((a, b) => b.createdAt - a.createdAt);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [auth?.id]);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingOutlined style={{ fontSize: '4rem', color: '#1a1a1a' }} />
        <p style={{ marginTop: '1rem', color: '#888' }}>Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
        <ShoppingOutlined style={{ fontSize: '6rem', color: '#e8e8e8', marginBottom: '2rem' }} />
        <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>No Orders Yet</h3>
        <p style={{ color: '#888', marginBottom: '2rem', textAlign: 'center' }}>
          When you place an order, it will appear here.
        </p>
        <button
          className="button"
          type="button"
          onClick={() => history.push('/shop')}
          style={{ padding: '1rem 3rem' }}
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ marginBottom: '2rem', borderBottom: '2px solid #f0f0f0', paddingBottom: '1rem' }}>
        <h2 style={{ margin: 0, fontSize: '2.4rem', fontWeight: '600' }}>
          My Orders
        </h2>
        <p style={{ margin: '0.5rem 0 0 0', color: '#888' }}>
          {orders.length} {orders.length === 1 ? 'order' : 'orders'} placed
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: '1px solid #e8e8e8',
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            {/* Order Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.5rem',
                background: '#fafafa',
                borderBottom: '1px solid #f0f0f0',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '1.1rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Order ID</p>
                  <p style={{ margin: '0.3rem 0 0 0', fontSize: '1.4rem', fontWeight: '600', color: '#333' }}>
                    #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '1.1rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</p>
                  <p style={{ margin: '0.3rem 0 0 0', fontSize: '1.4rem', color: '#333' }}>
                    {displayDate(order.createdAt)}
                  </p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '1.1rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</p>
                  <p style={{ margin: '0.3rem 0 0 0', fontSize: '1.4rem', fontWeight: '600', color: '#52c41a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircleFilled /> {order.status || 'Confirmed'}
                  </p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontSize: '1.1rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total</p>
                <p style={{ margin: '0.3rem 0 0 0', fontSize: '2rem', fontWeight: '700', color: '#1a1a1a' }}>
                  {displayMoney(order.subtotal)}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div style={{ padding: '1.5rem' }}>
              <p style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', color: '#888' }}>
                {order.items?.length || 0} {(order.items?.length || 0) === 1 ? 'item' : 'items'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {order.items?.map((item, index) => (
                  <div
                    key={item.id || index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      background: '#f9f9f9',
                      borderRadius: '8px',
                      border: '1px solid #f0f0f0',
                      minWidth: '280px',
                      maxWidth: '350px',
                    }}
                  >
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        background: '#fff',
                        borderRadius: '8px',
                        flexShrink: 0,
                        overflow: 'hidden',
                        border: '1px solid #e8e8e8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name || 'Product'}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'contain',
                          padding: '5px'
                        }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: '1.4rem', fontWeight: '500', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.name || 'Product'}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.3rem' }}>
                        <span style={{ fontSize: '1.2rem', color: '#888' }}>Qty: {item.quantity || 1}</span>
                        <span style={{ fontSize: '1.3rem', fontWeight: '600', color: '#333' }}>{displayMoney(item.price || 0)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrdersTab;
