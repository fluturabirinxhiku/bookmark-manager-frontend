import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import BookmarkList from "./BookmarkList";

const Main = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/folders">
          <Route path=":folderName" element={<BookmarkList />} />
        </Route>
        <Route exact path="/" element={<BookmarkList />} />
      </Routes>
    </Layout>
  );
};

export default Main;
