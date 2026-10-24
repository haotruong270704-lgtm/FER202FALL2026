import AxiosDemo from './components/AxiosDemo';
import PostList from './components/PostList';

function App() {
  return (
    <div className="container my-4">
      <h1 className="text-center text-primary mb-4">DemoAxios</h1>
      <AxiosDemo />
      <PostList />
    </div>
  );
}

export default App;