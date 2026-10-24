import AxiosDemo from './components/AxiosDemo';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import PatchPost from './components/PatchPost';
import DeletePost from './components/DeletePost';
import RequestConfig from './components/RequestConfig';
import AdvancedDemo from './components/AdvancedDemo';

function App() {
  return (
    <div className="container my-4">
      <h1 className="text-center text-primary fw-bold mb-4">DemoAxios - Hoàn chỉnh</h1>

      {/* Phần 3 Nâng cao */}
      <AdvancedDemo />

      <hr className="my-4" />

      {/* Phần 1 & 2 */}
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