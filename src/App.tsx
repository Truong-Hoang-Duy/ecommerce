import productsApi from './api/productsApi';
import { useEffect } from 'react';
import Router from './Router';
import cartsApi from './api/cartsApi';

function App() {
  useEffect(() => {
    // productsApi.getAll().then((res) => console.log(res));
  }, []);
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
