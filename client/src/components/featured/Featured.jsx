import React, { useState } from 'react';
import './Featured.scss';
import { useNavigate } from 'react-router-dom';
const Featured = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/gigs?search=${input}`);
  };
  return (
    <div className="featured">
      <div className="container bg">
        <h1>
          LUNAR NEW YEAR SALE
        </h1>
        <br />
        <p>
        25/01 - 31/01
        <br />

        Ưu đãi lên đến 60%. Giá hiển thị trên trang web là giá bán cuối cùng. <br />
        Một số sản phẩm ngoại lệ. Điều khoản và Điều kiện đi kèm.
        </p>
        <div className="search">
          {/* <div className="searchInput">
            <img src="./img/search.png" alt="" />
            <input
              type="text"
              placeholder='Try "building mobile app"'
              name=""
              id=""
              onChange={(e) => setInput(e.target.value)}
            />
          </div> */}
          <button onClick={handleClick}>SĂN SALE</button>
        </div>
        <div className="popular">
          <span>Popular:</span>
          <button>IVY PARK</button>
          <button>ULTRABOOST</button>
          <button>PREDATOR</button>
          <button>YEEZY</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
