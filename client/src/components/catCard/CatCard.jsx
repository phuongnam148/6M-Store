import React from 'react';
import './CatCard.scss';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/currencyFormat';

const CatCard = ({ item }) => {
  return (
    <Link to={`/products?category=${item.id}`}>
      {/* <div className="catCard">
        <img src={item.img} />
        <span className="desc">{item.desc}</span>
        <h2 className="title">{item.title}</h2>
      </div> */}
      <div className="catCard">
        <div className="h-[303px] relative">
          {/* <img src="" alt="" /> */}
          <img
            src={item.cover}
            alt=""
            className="w-[303px] h-[303px] absolute"
          />
          <button className="bg-white absolute top-[280px] left-[10px] px-2 py-1">
            {formatCurrency(item.price)}
          </button>
        </div>
        <div className="p-[10px]">
          <p className="font-medium">{item.title}</p>
          <p className="font-thin">{item.category}</p>
          <p className="font-medium">{item.badge_text}</p>
        </div>
      </div>
    </Link>
  );
};

export default CatCard;
