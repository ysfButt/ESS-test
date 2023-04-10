/**
 *
 * ESS-Test
 * Author: ESS-Test
 *
 */

import React, { useState } from 'react';
import { Row, Col, Select, } from 'antd';

// Components
import Loader from 'components/Loader';
import ProductCard from 'components/ProductCard';

const { Option } = Select;

const Home = (props) => {

  // States
  const [selectedColor, setSelectedColor] = useState('All');

  // Props
  const { data, loader, handleAddToCart, handleReduceQuantity } = props;

  // Find Colors
  const getColors = (value, output) => {
    let colors = [];
    for (let i = 0; i < value.length; i ++) {
      colors?.push(value[i][output])
    }
    return colors;
  }

  let colors = getColors(data, 'colour');
  colors.unshift('All');

  let filteredColors = colors.filter((i, index) => {
    return colors.indexOf(i) === index;
  })

  const onColorChange = (value) => {
    setSelectedColor(value);
  }

  const filteredProducts = selectedColor === 'All' ? data : data.filter((product) => product.colour === selectedColor);

  return (
    <div className="home-page">

      {/* Main Sub Header  */}
      <div className="sub-header mr-b-30">
        <div className="container">
          <div className="sub-header-wrap">
            <h2 className="title">Product Listing</h2>
            <Select
              defaultValue={selectedColor}
              onChange={onColorChange}
            >
              {filteredColors.map((item, i) => (
                <Option key={i} value={item}>{item}</Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
      {/* Main Sub Header End */}

      {/* Product Listing Section */}
      {loader ?
        <Loader />
        :
        <section className="product-listing-sec mr-b-30">
          <div className="container">
  
            {/* Product Listing Wrap */}
            <Row gutter={[30, 30]}>
              {filteredProducts?.map((item, i) => (
                <Col xs={24} md={12} lg={8} key={i}>
                  <ProductCard
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.img}
                    color={item.colour}
                    onAddToCart={handleAddToCart}
                    onReduceQuantity={handleReduceQuantity}
                  />
                </Col>
              ))}
              {/* {filteredProducts?.map((item, i) => (
                <Col xs={24} md={12} lg={8} key={i}>
                  <Card
                    cover={
                      <img
                        alt={item.colour}
                        src={item.img}
                      />
                    }
                  >
                    <Meta
                      avatar={<Avatar src={item.img} />}
                      title={item.name}
                      description={
                        <div className="flex align-item-center justify-space-between">
                          <span>{item.colour}</span>
                          <span>${item.price}</span>
                        </div>
                      }
                    />
                    <div className="qty-input mr-t-20">
                      <Button type="warning" icon={<MinusOutlined />} onClick={decreaseQuantity} />
                      <Input value={quantity} readOnly onChange={handleChange} className="text-center" />
                      <Button type="warning" icon={<PlusOutlined />} onClick={increaseQuantity} />
                    </div>
                  </Card>
                </Col>
              ))} */}
              <Col xs={24} md={12} lg={8}></Col>
            </Row>
            {/* Product Listing Wrap End */}
  
          </div>
        </section>
      }
      {/* Product Listing Section End */}

    </div>
  )
};

export default Home;
