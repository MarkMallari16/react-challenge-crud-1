
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const initialSellers = () => {
    const initialSeller = localStorage.getItem("sellers");

    return JSON.parse(initialSeller) || []
  }
  const [sellers, setSellers] = useState(initialSellers);
  const [sellerId, setSellerId] = useState(0);
  const [sellerValue, setSellerValue] = useState("");
  const [searchSeller, setSearchSeller] = useState("");
  const [sortBy, setSortBy] = useState("ascending");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("sellers", JSON.stringify(sellers));
  }, [sellers])
  const handleSellerChange = (e) => {
    validateField();
    setSellerValue(e.target.value);
  }
  const validateField = () => {
    if (sellerValue.trim() === "") {
      setError("Seller name cannot be empty.")
      return false;
    }
    setError("");
    return true;
  }
  const addSeller = () => {

    if (validateField()) {

      const newSeller = {
        id: sellerId + 1,
        name: sellerValue,
        isUpdate: false
      }
      setSellers((prevSellers) => [...prevSellers, newSeller]);
      setSellerId(sellerId + 1)
      setSellerValue('');
    }
  }
  const deleteSeller = (index) => {
    setSellers((prevSellers) => prevSellers.filter((seller, _) => seller.id !== index));
  }
  const toggleUpdate = (index) => {
    const sellerUpdate = sellers.map((seller, _) =>
      seller.id === index ? { ...seller, isEditing: !seller.isEditing } : seller
    );

    setSellers(sellerUpdate);
  }

  const handleUpdateChange = (e, index) => {
    const sellerUpdate = sellers.map((seller, _) =>
      seller.id === index ? { ...seller, name: e.target.value } : seller
    );

    setSellers(sellerUpdate);
  }
  const handleSearchSellers = (e) => {
    setSearchSeller(e.target.value)
  }
  const sortedSellers = [...sellers].sort((a, b) => {
    if (sortBy === "ascending") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "descending") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  })
  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  }
  const filteredSellers = sortedSellers.filter((seller) => seller.name.toLowerCase().includes(searchSeller.toLowerCase()));

  return (
    <div className='mx-5 lg:mx-20'>
      <div className='flex justify-center '>
        <div className='btn btn-ghost text-2xl my-5'>Simple CRUD React</div>
      </div>
      <div>

        <div className='flex gap-2'>
          <input type="text" className='input input-bordered w-full' value={sellerValue} onChange={handleSellerChange} placeholder='Enter seller name' />
          <button onClick={addSeller} className='btn btn-primary'>Add Seller</button>
        </div>
      </div>
      {error && <p className='text-error'>{error}</p>}
      <div className="mt-10 overflow-x-auto">
        <div className='flex justify-between p-1'>
          <h1 className='font-bold text-2xl mb-1'>Seller Info</h1>
          <div className='flex items-center gap-5'>
            <div>
              <select value={sortBy} onChange={handleSortBy} className='select select-bordered w-full'>
                <option disabled value="">Select Sort</option>
                <option value="ascending">Ascending A-Z</option>
                <option value="descending">Descending Z-A</option>
              </select>
            </div>
            <div className='relative'>
              <span className='absolute inset-y-0 flex items-center pl-3'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                </svg>
              </span>

              <input type="text" value={searchSeller} onChange={handleSearchSellers} className='input input-bordered w-96 pl-10' placeholder='Search here...' />
            </div>
          </div>

        </div>
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
            {filteredSellers.length === 0 ?
              <tr>
                <td colSpan="4" className='text-2xl font-bold text-center'>No sellers found</td>
              </tr> : (
                filteredSellers.map((seller, _) => (
                  <tr key={seller.id}>
                    <td>{seller.id}</td>
                    <td>
                      {seller.isEditing ? (
                        <input
                          type="text"
                          value={seller.name}
                          className='input input-bordered'
                          onChange={(e) => handleUpdateChange(e, seller.id)}
                        />
                      ) : (
                        seller.name
                      )}
                    </td>
                    <td className='flex gap-2'>
                      <button onClick={() => toggleUpdate(seller.id)} className='btn btn-secondary'>
                        {seller.isEditing ? 'Save' : 'Update'}
                      </button>
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
