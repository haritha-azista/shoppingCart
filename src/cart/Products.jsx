import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
const Products = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => { fetchProducts() }, [])
  const fetchProducts = async () => {
    let results = await fetch("https://fakestoreapi.com/products")
      .then(res => res.json());
    console.log(results);
    setItems(results);
  }
  
  if (items.length === 0) {
    <h1>no product is available</h1>
  }
  const addItemsToCart = (id) => {
    const oldCart = [...cart];
    let cartItem = items.filter((item) => item.id === id);
    const newCart = [...oldCart, ...cartItem];
    setCart(newCart);
    console.log(cart);
  }
  const deleteItem = (id) => {
    let deleteItem = cart.filter((item) => item.id !== id);
    setCart(deleteItem);
  }
  return (
    <div>
      <Button onClick={() => { fetchProducts() }}>FetchProducts</Button>
      <Table striped bordered hover style={{ textAlign: 'start', padding: '10px' }}>
        <thead>
          <tr>
            <th>Id</th>
            <th style={{ textAlign: 'center' }}>productName</th>
            <th>Price</th>
          </tr>
        </thead>
        {items && items.map((item) => (
          <tr key={item.id} style={{ padding: '5px' }} >
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td style={{ fontWeight: 'bolder' }}>${item.price}</td>
            <td><Button variant='success' onClick={() => { addItemsToCart(item.id) }}>AddToCart</Button></td>
          </tr>
        ))}
      </Table>
      <h2 style={{ textAlign: 'center' }}>Cart</h2>
      <br />
      <div className='card' style={{ textAlign: 'center', alignItems: 'center' }}>
        <br />
        {
          cart.map((p) => (
            <div key={p.id} style={{
              border: '2px solid lightgrey', width: '500px', textAlign: 'center', marginBottom: '10px',
              borderRadius: '5px', boxShadow: '1px -1px 1px lightgrey '
            }}>
              <br />
              <img src={p.image} style={{ width: '15%', height: '20%', border: '1px solid', padding: '3px', borderRadius: '3px' }}
                alt='{p.title}'
              />
              <p>{p.title}</p>
              <p style={{ fontWeight: 'bolder' }}>${p.price}</p>
              <Button variant='danger' style={{ marginBottom: '5px' }} onClick={() => { deleteItem(p.id) }}>Remove</Button>
              <br />
            </div>
          ))
        }
      </div>
      <br />

    </div>
  )
}
export default Products