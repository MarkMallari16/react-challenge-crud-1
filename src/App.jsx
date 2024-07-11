
import { useState } from 'react'
import './App.css'

function App() {
  const [sellers, setSellers] = useState([]);
  const [sellerId, setSellerId] = useState(0);
  const [sellerValue, setSellerValue] = useState("");

  const handleSellerChange = (e) => {
    setSellerValue(e.target.value);
  }

  const addSeller = () => {
    const newSeller = {
      id: sellerId + 1,
      name: sellerValue,
      isUpdate: false
    }
    setSellers((prevSellers) => [...prevSellers, newSeller]);
    setSellerId(sellerId + 1)
    setSellerValue('');
  }
  const deleteSeller = (index) => {
    setSellers((prevSellers) => prevSellers.filter((seller, _) => seller.id !== index));
  }
  const updateSeller = (index) => {
    const sellerUpdate = sellers.map((seller, _) =>
      seller.id === index ? { ...seller, name: `${seller.name} Updated`, isUpdate: true } : seller
    );

    setSellers(sellerUpdate);
  }

  return (
    <div className='mx-5 lg:mx-20'>
      <div className='flex justify-center '>
        <div className='btn btn-ghost text-2xl my-5'>Simple CRUD React</div>
      </div>
      <div className='flex gap-2'>
        <input type="text" className='input input-bordered w-full' value={sellerValue} onChange={handleSellerChange} placeholder='Enter seller name' />
        <button onClick={addSeller} className='btn btn-primary'>Add Seller</button>
      </div>
      <div className="mt-10 overflow-x-auto">
        <h1 className='font-bold text-2xl mb-1'>Seller Info</h1>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers.length === 0 ?
              <tr>
                <td colSpan="4" className='text-2xl font-bold text-center'>No sellers </td>
              </tr> : (

                sellers.map((seller, _) => (
                  <tr key={seller.id}>
                    <td>{seller.id}</td>
                    <td>{seller.name}</td>
                    <td className='flex gap-2'>
                      <button onClick={() => updateSeller(seller.id)} className='btn btn-secondary'>Update</button>
                      <button onClick={() => deleteSeller(seller.id)} className='btn btn-error'>Delete</button>
                    </td>
                  </tr>
                ))

              )
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
