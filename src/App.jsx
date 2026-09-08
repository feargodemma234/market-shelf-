import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function getProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*, sellers(shop_name)')
        .order('created_at', { ascending: false })
      
      if (error) console.log(error)
      else setProducts(data)
    }
    getProducts()
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>MarketShelf 🛍️</h1>
      <p>Products will show here once you add them in Supabase</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '8px' }}>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <small>by {product.sellers?.shop_name}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App