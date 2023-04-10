import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';

// Components
import MainHeader from '../components/MainHeader';
import MainFooter from '../components/MainFooter';

// Layout
import LayoutRoutes from '../components/LayoutRoutes';

const UserLayout = props => {

  // States
  let [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Navigation
  const navigate = useNavigate();

  // Props
  const { routes } = props;

  // Fetch API
  const fetchApi = async () => {
    setLoader(true);
    try {
      await fetch('https://my-json-server.typicode.com/benirvingplt/products/products')
        .then(response => {
          return response.json()
        })
        .then(data => {
          setLoader(false);
          setData(data);
        })
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch API UseEffect
  useEffect(() => {
    fetchApi();
  }, []);

  const handleAddToCart = (productId, quantity, price) => {
    let cartItem = data.filter((item) => item.id === productId);
    cartItem[0]['quantity'] = quantity;
    cartItem[0]['totalPrice'] = quantity * price;
    setCartItems([...cartItems, ...cartItem ]);
  };

  const handleReduceQuantity = (quantity, price) => {
    let cartItem = cartItems.filter((obj, index) => cartItems.findIndex((item) => item.id === obj.id) === index);
    cartItem[0].quantity = quantity;
    cartItem[0].totalPrice = quantity * price;
    setCartItems([...cartItems, ...cartItem ]);
  };

  const handleRemoveFromCart = (productId) => {
    let cartItem = cartItems.filter((obj, index) => cartItems.findIndex((item) => item.id === obj.id) === index);
    let itemIndex = cartItems.findIndex((item) => item.id === productId);
    cartItem.splice(itemIndex, 1);
    return setCartItems(cartItem);
  };

  return (
    <Layout className="layout user-layout">
      {/* Main Header */}
      <MainHeader 
        navigate={navigate} 
        data={data} 
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
      />
      {/* Main Header End */}

      {/* Main Content */}
      <main className="main-content">

        {/* Layout Routes Or Pages To Render */}
        <LayoutRoutes 
          {...props} 
          routes={routes} 
          navigate={navigate} 
          data={data} 
          handleAddToCart={handleAddToCart} 
          handleReduceQuantity={handleReduceQuantity}
          loader={loader} 
        />
        {/* Layout Routes Or Pages To Render End */}

      </main>
      {/* Main Content End */}

      {/* Main Footer */}
      <MainFooter />
      {/* Main Footer End */}
    </Layout>
  )
};

export default UserLayout;
