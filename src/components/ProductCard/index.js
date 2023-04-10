import React, { useState, useEffect } from 'react';
import { Card, Avatar, Button, Input } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const { Meta } = Card;

function ProductCard(props) {

  // States
  const [quantity, setQuantity] = useState(0);

  // Props
  const { id, name, price, image, color, onAddToCart, onReduceQuantity, onRemoveFromCart, cartItem } = props;

  const handleAddToCart = () => {
    if (quantity < 10) {
      setQuantity(parseInt(quantity) + 1);
    }
    onAddToCart(id, quantity, price);
  };
  

  const handleReduceQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
    onReduceQuantity(quantity, price);
  };

  return (
    <>
      <Card
        cover={
          <img
            alt={color}
            src={image}
          />
        }
      >
        <Meta
          avatar={<Avatar src={image} />}
          title={name}
          description={
            <div className="flex align-item-center justify-space-between">
              <span>{color}</span>
              <span>${price}</span>
            </div>
          }
        />
        <div className="qty-input mr-t-20">
          <Button type="warning" icon={<MinusOutlined />} onClick={handleReduceQuantity} />
          <Input value={quantity} readOnly className="text-center" />
          <Button type="warning" icon={<PlusOutlined />} onClick={handleAddToCart} />
        </div>
        {/* <div className="qty-input mr-t-20">
          <Button type="warning" icon={<MinusOutlined />} onClick={decreaseQuantity} />s
          <Input value={quantity} readOnly onChange={handleChange} className="text-center" />
          <Button type="warning" icon={<PlusOutlined />} onClick={increaseQuantity} />
        </div> */}
      </Card>
      {/* <div>
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>Price: {price}</p>
        <p>Color: {color}</p>
        {cartItem && (
          <div>
            <p>Quantity in cart: {cartItem.quantity}</p>
            <Button onClick={handleReduceQuantity}>-</Button>
            <Button onClick={handleRemoveFromCart}>Remove from cart</Button>
          </div>
        )}
        {!cartItem && (
          <div>
            <Input type="number" defaultValue={1} min={1} max={10} onChange={handleAddToCart} />
            <Button onClick={handleAddToCart}>Add to cart</Button>
          </div>
        )}
      </div> */}
    </>
  );
}

export default ProductCard;
