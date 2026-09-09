import './App.css'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
      
      if (error) console.error(error)
      else setProducts(data)
      setLoading(false)
    }
    getProducts()
  }, [])

  if (loading) return <p>Loading products...</p>

  return (
    <div style={{ padding: '20px' }}>
      <h1>Market Shelf</h1>
      {products.length === 0 ? (
        <p>No products yet</p>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {products.map(p => (
            <div key={p.id} style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px' }}>
              <h2>{p.title}</h2>
              <p>{p.description}</p>
              <p><b>₦{p.price.toLocaleString()}</b></p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App