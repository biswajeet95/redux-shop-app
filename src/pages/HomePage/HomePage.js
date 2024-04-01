import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import HeaderSlider from '../../components/Slider/HeaderSlider';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../../store/categorySlice';
import ProductList from '../../components/ProductList/ProductList';
import Loader from '../../components/Loader/Loader';
import { fetchAsyncProducts, getAllProducts, getAllProductsStatus } from '../../store/productSlice';
import { STATUS } from '../../utils/status';

const HomePage = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector(getAllCategories);
  const categoriesToShow = allCategories.slice(0, 5); // Slice to show only 5 categories
  const products = useSelector(getAllProducts);
  const productStatus = useSelector(getAllProductsStatus);
  const [randomizedProducts, setRandomizedProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchAsyncProducts(50));
  }, [dispatch]);

  useEffect(() => {
    // Randomize products when products change
    if (products.length > 0) {
      const tempProducts = [...products].sort(() => Math.random() - 0.5);
      setRandomizedProducts(tempProducts);
    }
  }, [products]);

  const renderCategory = (category) => {
    const catProducts = products.filter(product => product.category === category);
    return (
      <div className='categories-item' key={category}>
        <div className='title-md'>
          <h3>{category}</h3>
        </div>
        {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProducts} />}
      </div>
    );
  };

  return (
    <main>
      <div className='slider-wrapper'>
        <HeaderSlider />
      </div>
      <div className='main-content bg-whitesmoke'>
        <div className='container'>
          <div className='categories py-5'>
            <div className='categories-item'>
              <div className='title-md'>
                <h3>See our products</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={randomizedProducts} />}
            </div>

            {categoriesToShow.map(category => renderCategory(category))}
            {/* 
                    //  category 0 to 5 data show//// topone//
                    // all category data show//// downone// */}
             {/* {allCategories.map(category => renderCategory(category))}  */}

          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;


