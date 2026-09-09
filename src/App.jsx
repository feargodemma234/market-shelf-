import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) console.log('Error:', error)
    else setProducts(data)
    setLoading(false)
  }

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system', background: '#f5f5f5', minHeight: '100vh' }}>
      
      {/* HERO SECTION */}
      <div style={{ 
        background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center',
        borderRadius: '0 0 30px 30px'
      }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 16px 0' }}>
          Sell Anything.<br/>We Handle the Rest.
        </h1>
        <button style={{
          background: 'linear-gradient(90deg, #EC4899 0%, #8B5CF6 100%)',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '20px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          marginTop: '10px'
        }}>
          Start Selling ›
        </button>
      </div>

      {/* CATEGORIES */}
      <div style={{ padding: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>Digital Products</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>+ $1230.00</p>
        
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>Physical Goods</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>+ $60.00</p>

        <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '20px 0 12px 0' }}>PRODUCTS</h2>
      </div>

      {/* PRODUCTS LIST */}
      <div style={{ padding: '0 20px 100px 20px' }}>
        {loading && <p>Loading...</p>}
        
        {products.map(product => (
          <div key={product.id} style={{ 
            background: 'white',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            {/* IMAGE PLACEHOLDER */}
            <div style={{
              width: '60px',
              height: '60px',
              background: '#E5E7EB',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              📦
            </div>

            {/* INFO */}
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' }}>
                {product.name || 'Product'}
              </h3>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
                {product.description}
              </p>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#4F46E5' }}>
                + ₦{product.price?.toLocaleString()}
              </p>
            </div>

            {/* ADD BUTTON */}
            <button style={{
              background: '#E0E7FF',
              color: '#4F46E5',
              border: 'none',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              fontSize: '20px',
              cursor: 'pointer'
            }}>
              +
            </button>
          </div>
        ))}
      </div>

      {/* FLOATING BUTTON */}
      <button style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'linear-gradient(90deg, #EC4899 0%, #8B5CF6 100%)',
        color: 'white',
        border: 'none',
        padding: '14px 28px',
        borderRadius: '30px',
        fontSize: '16px',
        fontWeight: '700',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)'
      }}>
        Start Selling
      </button>
    </div>
  )
}