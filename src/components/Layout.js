import FolderList from "./FolderList";
import Header from "./Header";
import { FolderProvider } from "../context/folderContext";

const Layout = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col p-0">
          <Header />
        </div>
      </div>
      <FolderProvider>
        <div className="row">
          <div className="col-12 col-md-3 ps-0">
            <FolderList />
          </div>
          <div className="col-12 col-md-9">
            <div className="main-content">
              <div className="row">{children}</div>
            </div>
          </div>
        </div>
      </FolderProvider>
    </div>
  );
};

export default Layout;
