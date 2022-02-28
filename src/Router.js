import {BrowserRouter,
  Routes,
  Route} from 'react-router-dom';
import './App.css';
import App from './App';
import SerchPage from './SerchPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/search" element={<SerchPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
