import Navbar from './components/Navbar';
import Home from './pages/Home';

const App = () => {
  return (
    <>
      <div className='min-h-screen bg-slate-900'>
        <Navbar />
        <div>
          <Home />
        </div>
      </div>
    </>
  );
};

export default App;
