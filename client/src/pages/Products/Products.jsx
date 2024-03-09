import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import GigCard from '../../components/gigCard/GigCard';
import newRequest from '../../utils/newRequest';
import './Products.scss';
import { category, cards } from '../../data';
const Products = () => {
  const [sort, setSort] = useState('createdAt');
  const [open, setOpen] = useState(false);
  const minRef = useRef(0);
  const maxRef = useRef(1000);

  const { search } = useLocation();
  const cateID = search.substr(-1);
  // console.log(cateID);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  useEffect(() => {
    refetch();
  }, [search]);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };
  return (
    <div className="products">
      <div className="container">
        <span className="breadcrumbs">Nam / {category[cateID - 1].title}</span>
        <h1>{cards[cateID - 1].title}</h1>
        <p>
          Dòng sản phẩm giày nam của adidas sẽ đáp ứng mọi nhu cầu, <br /> dù là
          bạn đang phấn đấu để trở thành người giỏi nhất <br /> hay chỉ muốn có
          một đôi giày vừa vặn nhất trong cuộc sống hàng ngày của mình. <br />{' '}
          Với thiết kế mang tính biểu tượng và công nghệ hiệu suất cao, bạn có
          thể chắc chắn rằng đôi giày của mình sẽ không khiến bạn thất vọng.
        </p>
        <div className="menu">
          <div className="left">
            <span>Giá</span>
            <input ref={minRef} type="number" placeholder="thấp" />
            <input ref={maxRef} type="number" placeholder="cao" />
            <button onClick={apply}>ÁP Dụng</button>
          </div>
          <div className="right">
            <span className="sortBy">Sắp Xếp Theo</span>
            <span className="sortType">
              {sort === 'sales' && 'Bán Chạy Nhất'}
              {sort === 'price' && 'Giá'}
              {sort === 'createdAt' && 'Mới Nhất'}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === 'sales' && (
                  <>
                    <span onClick={() => reSort('createdAt')}>Mới Nhất</span>
                    <span onClick={() => reSort('price')}>Giá</span>
                  </>
                )}
                {sort === 'price' && (
                  <>
                    <span onClick={() => reSort('sales')}>Bán Chạy Nhất</span>
                    <span onClick={() => reSort('createdAt')}>Mới Nhất</span>
                  </>
                )}
                {sort === 'createdAt' && (
                  <>
                    <span onClick={() => reSort('price')}>Giá</span>
                    <span onClick={() => reSort('sales')}>Bán Chạy Nhất</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="all">
          <div class="h-[1200px] m-auto mt-[20px] flex flex-wrap">
            <div class="w-[25%] h-[400px] pr-[5px]">
              <div class="h-[303px] relative">
                <img
                  src="../img/Giay_Superstar_Adifom_Be_IF6179_01_standard.avif"
                  alt=""
                  class="w-[303px] h-[303px] absolute"
                />
                <button class="bg-white absolute top-[280px] left-[10px]">
                  1.700.000đ
                </button>
              </div>
              <div class="p-[10px]">
                <p class="font-medium">Giày superstar Adifom</p>
                <p class="font-thin">Nam Original</p>
                <p class="font-medium">Mới</p>
              </div>
            </div>
            <div class="w-[25%] h-[400px] pr-[5px]">
              <div class="h-[303px] relative">
                <img
                  src="../img/Giay_Superstar_Adifom_Be_IF6179_01_standard.avif"
                  alt=""
                  class="w-[303px] h-[303px] absolute"
                />
                <button class="bg-white absolute top-[280px] left-[10px]">
                  1.700.000đ
                </button>
              </div>
              <div class="p-[10px]">
                <p class="font-medium">Giày superstar Adifom</p>
                <p class="font-thin">Nam Original</p>
                <p class="font-medium">Mới</p>
              </div>
            </div>
            <div class="w-[25%] h-[400px] pr-[5px]">
              <div class="h-[303px] relative">
                <img
                  src="../img/Giay_Superstar_Adifom_Be_IF6179_01_standard.avif"
                  alt=""
                  class="w-[303px] h-[303px] absolute"
                />
                <button class="bg-white absolute top-[280px] left-[10px]">
                  1.700.000đ
                </button>
              </div>
              <div class="p-[10px]">
                <p class="font-medium">Giày superstar Adifom</p>
                <p class="font-thin">Nam Original</p>
                <p class="font-medium">Mới</p>
              </div>
            </div>
            <div class="w-[25%] h-[400px] pr-[5px]">
              <div class="h-[303px] relative">
                <img
                  src="../img/Giay_Superstar_Adifom_Be_IF6179_01_standard.avif"
                  alt=""
                  class="w-[303px] h-[303px] absolute"
                />
                <button class="bg-white absolute top-[280px] left-[10px]">
                  1.700.000đ
                </button>
              </div>
              <div class="p-[10px]">
                <p class="font-medium">Giày superstar Adifom</p>
                <p class="font-thin">Nam Original</p>
                <p class="font-medium">Mới</p>
              </div>
            </div>
            <div class="w-[25%] h-[400px] pr-[5px]">
              <div class="h-[303px] relative">
                <img
                  src="../img/Giay_Superstar_Adifom_Be_IF6179_01_standard.avif"
                  alt=""
                  class="w-[303px] h-[303px] absolute"
                />
                <button class="bg-white absolute top-[280px] left-[10px]">
                  1.700.000đ
                </button>
              </div>
              <div class="p-[10px]">
                <p class="font-medium">Giày superstar Adifom</p>
                <p class="font-thin">Nam Original</p>
                <p class="font-medium">Mới</p>
              </div>
            </div>
            <div class="w-[25%] h-[400px] pr-[5px]">
              <div class="h-[303px] relative">
                <img
                  src="../img/Giay_Superstar_Adifom_Be_IF6179_01_standard.avif"
                  alt=""
                  class="w-[303px] h-[303px] absolute"
                />
                <button class="bg-white absolute top-[280px] left-[10px]">
                  1.700.000đ
                </button>
              </div>
              <div class="p-[10px]">
                <p class="font-medium">Giày superstar Adifom</p>
                <p class="font-thin">Nam Original</p>
                <p class="font-medium">Mới</p>
              </div>
            </div>
            <div class="w-[25%] h-[400px] pr-[5px]">
              <div class="h-[303px] relative">
                <img
                  src="../img/Giay_Superstar_Adifom_Be_IF6179_01_standard.avif"
                  alt=""
                  class="w-[303px] h-[303px] absolute"
                />
                <button class="bg-white absolute top-[280px] left-[10px]">
                  1.700.000đ
                </button>
              </div>
              <div class="p-[10px]">
                <p class="font-medium">Giày superstar Adifom</p>
                <p class="font-thin">Nam Original</p>
                <p class="font-medium">Mới</p>
              </div>
            </div>
            <div class="w-[25%] h-[400px] pr-[5px]">
              <div class="h-[303px] relative">
                <img
                  src="../img/Giay_Superstar_Adifom_Be_IF6179_01_standard.avif"
                  alt=""
                  class="w-[303px] h-[303px] absolute"
                />
                <button class="bg-white absolute top-[280px] left-[10px]">
                  1.700.000đ
                </button>
              </div>
              <div class="p-[10px]">
                <p class="font-medium">Giày superstar Adifom</p>
                <p class="font-thin">Nam Original</p>
                <p class="font-medium">Mới</p>
              </div>
            </div>
            <div class="w-[25%] h-[400px] pr-[5px]">
              <div class="h-[303px] relative">
                <img
                  src="../img/Giay_Superstar_Adifom_Be_IF6179_01_standard.avif"
                  alt=""
                  class="w-[303px] h-[303px] absolute"
                />
                <button class="bg-white absolute top-[280px] left-[10px]">
                  1.700.000đ
                </button>
              </div>
              <div class="p-[10px]">
                <p class="font-medium">Giày superstar Adifom</p>
                <p class="font-thin">Nam Original</p>
                <p class="font-medium">Mới</p>
              </div>
            </div>
            <div class="w-[25%] h-[400px] pr-[5px]">
              <div class="h-[303px] relative">
                <img
                  src="../img/Giay_Superstar_Adifom_Be_IF6179_01_standard.avif"
                  alt=""
                  class="w-[303px] h-[303px] absolute"
                />
                <button class="bg-white absolute top-[280px] left-[10px]">
                  1.700.000đ
                </button>
              </div>
              <div class="p-[10px]">
                <p class="font-medium">Giày superstar Adifom</p>
                <p class="font-thin">Nam Original</p>
                <p class="font-medium">Mới</p>
              </div>
            </div>
            <div class="w-[25%] h-[400px] pr-[5px]">
              <div class="h-[303px] relative">
                <img
                  src="../img/Giay_Superstar_Adifom_Be_IF6179_01_standard.avif"
                  alt=""
                  class="w-[303px] h-[303px] absolute"
                />
                <button class="bg-white absolute top-[280px] left-[10px]">
                  1.700.000đ
                </button>
              </div>
              <div class="p-[10px]">
                <p class="font-medium">Giày superstar Adifom</p>
                <p class="font-thin">Nam Original</p>
                <p class="font-medium">Mới</p>
              </div>
            </div>
            <div class="w-[25%] h-[400px] pr-[5px]">
              <div class="h-[303px] relative">
                <img
                  src="../img/Giay_Superstar_Adifom_Be_IF6179_01_standard.avif"
                  alt=""
                  class="w-[303px] h-[303px] absolute"
                />
                <button class="bg-white absolute top-[280px] left-[10px]">
                  1.700.000đ
                </button>
              </div>
              <div class="p-[10px]">
                <p class="font-medium">Giày superstar Adifom</p>
                <p class="font-thin">Nam Original</p>
                <p class="font-medium">Mới</p>
              </div>
            </div>
          </div>
          <h2></h2>
        </div>
        <div className="cards">
          {isLoading
            ? 'loading'
            : error
            ? 'Something went wrong...'
            : data.length > 0 &&
              data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
};

export default Products;
