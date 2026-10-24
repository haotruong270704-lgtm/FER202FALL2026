import AxiosDemo from './components/AxiosDemo';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import PatchPost from './components/PatchPost';
import DeletePost from './components/DeletePost';
import RequestConfig from './components/RequestConfig';

function App() {
  return (
    <div className="container my-4">
      <h1 className="text-center text-primary fw-bold mb-4">DemoAxios - Phần 1 & 2</h1>

      <AxiosDemo />
      <PostList />
      <CreatePost />
      <UpdatePost />
      <PatchPost />
      <DeletePost />
      <RequestConfig />
    </div>
  );
}

export default App;