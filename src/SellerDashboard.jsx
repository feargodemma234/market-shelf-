import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function SellerDashboard() {
  const [usdtWallet, setUsdtWallet] = useState('')
  const [email, setEmail] = useState('')

  const saveWallet = async () => {
    const { error } = await supabase
      .from('sellers')
      .upsert({ email, usdt_wallet: usdtWallet, status: 'pending' })
    if(!error) alert("Wallet saved! Now pay listing fee")
  }

  return (
    <div>
      <h2>Seller Dashboard - 1234</h2>
      <input placeholder="Your Email" onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Your USDT TRC20 Wallet" onChange={e=>setUsdtWallet(e.target.value)} />
      <button onClick={saveWallet}>Save Payment Method</button>
      
      <hr/>
      <h3>Pay ${2} USDT Listing Fee to: {import.meta.env.VITE_ADMIN_WALLET}</h3>
      <p>Send USDT TRC20 then submit TX hash to admin</p>
    </div>
  )
}