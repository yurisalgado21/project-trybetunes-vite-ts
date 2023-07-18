import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/search" element={ <Search /> } />
    </Routes>
  );
}

export default App;
