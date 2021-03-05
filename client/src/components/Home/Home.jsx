import React from "react";
import "./Home.css";
import Product from "../Product/Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/Gateway/2020/May/gaming_1500x600._CB431281464_.jpg"
        />
      </div>
      <div className="home__row">
        <Product
          id={1}
          title="Apple MacBook Pro (16-inch, 16GB RAM, 512GB Storage, 2.6GHz 9th Gen Intel&nbsp;Core&nbsp;i7) - Space Grey"
          price={189900}
          rating={5}
          img="https://images-na.ssl-images-amazon.com/images/I/71L2iBSyyOL._SL1500_.jpg"
        />

        <Product
          id={2}
          title="Attitude Is Everything: Change Your Attitude ... Change Your Life! Paperback"
          price={109}
          rating={3}
          img="https://images-na.ssl-images-amazon.com/images/I/41F8ATXoMOL._SX317_BO1,204,203,200_.jpg"
        />
      </div>
      <div className="home__row">
        <Product
          id={3}
          title="Raspberry Pi 4 8GB RAM | All New Raspberry Pi Desktop Computer"
          price={7999}
          rating={5}
          img="https://images-na.ssl-images-amazon.com/images/I/61mRJm8%2Bc4L._SX425_.jpg"
        />
        <Product
          id={4}
          title="Apple iPhone 7 (32GB) - Black"
          price={23999}
          rating={5}
          img="https://images-na.ssl-images-amazon.com/images/I/41D9NDiSzjL._SL1024_.jpg"
        />
        <Product
          id={5}
          title="boAt Airdopes 441 , Up to 30H Total Playback, IPX7 Water Resistance"
          price={1999}
          rating={3}
          img="https://images-na.ssl-images-amazon.com/images/I/61xQJ0XcCCL._SX569_.jpg"
        />
        <Product
          id={6}
          title="All-new Echo Dot (4th Gen) | Next generation smart speaker"
          price={4499}
          rating={5}
          img="https://images-na.ssl-images-amazon.com/images/I/61MbLLagiVL._SL1000_.jpg"
        />
        <Product
          id={7}
          title="Prestige Electric Kettle PKOSS-1500watts, Steel (1.5Ltr), Black "
          price={814}
          rating={4}
          img="https://images-na.ssl-images-amazon.com/images/I/81Way6oKRRL._SX569_.jpg"
        />
      </div>
      <div className="home__row">
        <Product
          id={8}
          title="LG QHD (2560 x 1440) 32 Inch IPS Display 3 Side Borderless - HDR 10, sRGB 99%, AMD Free sync - Dual HDMI, Display Port - 32QN600+ Logitech Keyboard Combo"
          price={29570}
          rating={4}
          img="https://images-na.ssl-images-amazon.com/images/I/81tGafGD6qL._SX679_.jpg"
        />
      </div>
    </div>
  );
}

export default Home;
