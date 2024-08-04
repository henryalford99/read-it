import './App.css';
import SearchBar from '../features/SearchBar/SearchBar';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <nav className="App-nav">
          <p>
            LOGO
          </p>
          <SearchBar />
          <p>
            subreddits
          </p>
        </nav>
        <section>
          <p>
            reddit posts here
          </p>
        </section>
      </div>
    </Provider>
  );
}

export default App;
