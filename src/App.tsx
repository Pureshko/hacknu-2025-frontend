import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Objects from './pages/Objects';
import Analysis from './pages/Analysis';
import Export from './pages/Export';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="objects" element={<Objects />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="export" element={<Export />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;