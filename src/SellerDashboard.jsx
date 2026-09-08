import React, { useState } from 'react'
import { supabase, createProduct } from './supabase'

export default function SellerDashboard() {
  const [form, setForm] = useState({ title: '', price: '', type: 'digital', description: '' })

  async function handleSubmit(e) {
    e.preventDefault()
    const { data: { user } = await supabase.auth.getUser()

    await createProduct({
     ...form,
      price: parseFloat(form.price),
      seller_id: user.id // you'll link this to sellers table
    })
    alert('Product uploaded!')
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Upload Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input placeholder="Product Title" className="p-3 bg-zinc-900 rounded" onChange={e => setForm({...form, title: e.target.value})} />
        <input placeholder="Price" type="number" className="p-3 bg-zinc-900 rounded" onChange={e => setForm({...form, price: e.target.value})} />
        <select className="p-3 bg-zinc-900 rounded" onChange={e => setForm({...form, type: e.target.value})}>
          <option value="digital">Digital</option>
          <option value="service">Service</option>
          <option value="physical">Physical</option>
        </select>
        <textarea placeholder="Description" className="p-3 bg-zinc-900 rounded" onChange={e => setForm({...form, description: e.target.value})} />
        <button className="p-3 bg-purple-600 rounded font-bold">Upload</button>
      </form>
    </div>
  )
}