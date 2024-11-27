import{ BrowserRouter, Routes, Route} from 'react-router-dom';
import Sign_up from './pages/Sign_up';
import Log_in from './pages/Log_in';
import Home from './pages/Home';
import Order from './pages/Order';
import OrderFave from './pages/OrderFave';
import OrderSurprise from './pages/OrderSurprise';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route index element={<Sign_up />} />
            <Route path="/Sign_up" element={<Sign_up />} />
            <Route path="/Log_in" element={<Log_in />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Order" element={<Order />} />
            <Route path="/OrderFave" element={<OrderFave />} />
            <Route path="/OrderSurprise" element={<OrderSurprise />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
