import './App.css';
import Carousel from './components/Carousel';

function App() {
  return (
    <div className="App">
      <Carousel />
      <Carousel slides={4} infinite={true} />
      <Carousel slides={10} infinite={false} />
    </div>
  );
}

export default App;
