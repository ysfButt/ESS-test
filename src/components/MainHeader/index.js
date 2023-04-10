/**
 *
 * ESS-Test
 * Author: ESS-Test
 *
 */

import React, { useEffect, useState } from 'react';
import { Button, Layout, Avatar, Popover, Input, Badge } from 'antd';
import { ShoppingCartOutlined, PlusOutlined, MinusOutlined, CloseCircleFilled } from '@ant-design/icons';

const { Header } = Layout;

const MainHeader = (props) => {

  // States
  const [small, setSmall] = useState(false);

  // Props
  const { navigate, cartItems, onRemoveFromCart } = props;

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setSmall(window.pageYOffset > 10)
      );
    }
  }, []);

  let toCart = cartItems.filter((obj, index) => cartItems.findIndex((item) => item.id === obj.id) === index);

  const notifyContent = (
    <div className="notify-content">
      {toCart.length > 0 ?
        toCart.map((item, i) => (
          <CartItemWrap 
            i={i}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.img}
            color={item.colour}
            totalPrice={item.totalPrice}
            quantity={item.quantity}
            onRemoveFromCart={onRemoveFromCart}
          />
        ))
        :
        <div className="pd-20 text-center f-w-600 text-black">Add to Cart</div>
      }
      <div className="pd-l-10 pd-r-10 pd-b-20">
        <Button type="primary" block>View all</Button>
      </div>
    </div>
  );

  return (
    <Header className={`main-header ${small ? 'fixed' : ''}`}>
      <div className="p-relative">
        <div className="container">
          <div className="nav-holder">
            <div className="logo">
              <a href="/" rel="nooppener noreferrer">
                {/* <img src="https://oauth.rebrandly.com/img/rebrandly-logo.svg" alt="logo" /> */}
                Logo
              </a>
            </div>
            <div className="main-mwnu-group">
              <ul className="main-menu">
                <li>
                  <a href="/product" rel="nooppener noreferrer">Listing</a>
                </li>
              </ul>
              <ul className="main-menu second-menu">
                <li>
                  <Popover content={notifyContent} trigger="click" placement="bottomRight">
                    <Badge dot={cartItems.length > 0} overflowCount={10}>
                      <ShoppingCartOutlined className="icon" />
                    </Badge>
                  </Popover>
                </li>
                <li>
                  <Button type="primary" ghost onClick={() => navigate('/')}>Login</Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
}

MainHeader.propTypes = {};

export default MainHeader;

const CartItemWrap = ({ id, name, image, color, totalPrice, quantity, i, item, onRemoveFromCart }) => {

  const handleRemoveFromCart = () => {
    onRemoveFromCart(id);
  };

  return (
    <div className="notify-content-item" key={i}>
      <div className="notify-content-head">
        <div className="icon">
          <Avatar size="small" src={image} />
        </div>
        <div className="caption">
          <p>{name}</p>
        </div>
        <div className="close-icon">
          <CloseCircleFilled onClick={handleRemoveFromCart} />
        </div>
      </div>
      <div className="notify-content-footer">
        <span>{color}</span>
        <span className="time">${totalPrice}</span>
      </div>
      <div className="qty-input mr-t-20">
        <Button type="warning" icon={<MinusOutlined />} />
        <Input value={quantity} readOnly className="text-center" />
        <Button type="warning" icon={<PlusOutlined />} />
      </div>
    </div>
  )
};
