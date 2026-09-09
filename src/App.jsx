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
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Market Shelf</h1>
      
      {loading && <p>Loading...</p>}
      
      {!loading && products.length === 0 && (
        <p>No products yet. Add some in Supabase!</p>
      )}
      
      <div style={{ display: 'grid', gap: '16px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px' }}>
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}