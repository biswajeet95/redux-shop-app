
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Pages//
import { Home, CategoryProduct, ProductSingle, Cart, Search } from "../src/pages/index";
//components//
import { Header } from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import { Provider } from 'react-redux';
import store from './store/store';
import './App.scss';



function App() {
  return (
    <div >
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Sidebar />
          <Routes>
            {/* home page route */}
            <Route path="/" element={<Home />} />
            {/* single product route */}
            <Route path="/product/:id" element={<ProductSingle />} />
            {/* category wise product listing route */}
            <Route path="/category/:category" element={<CategoryProduct />} />
            {/* cart */}
            <Route path="/cart" element={<Cart />} />
            {/* searched products */}
            <Route path="/search/:searchTerm" element={<Search />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>


    </div>
  );
}

export default App;
