import { saveFolder } from "../services/folderService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { validateFolderAdd } from "../validation/validator";
import { NavLink } from "react-router-dom";
import { FolderContext } from "../context/folderContext";
import { useContext } from "react";

const FolderList = () => {
  const { folders, setFolders } = useContext(FolderContext);
  return (
    <div id="sidebar">
      <Formik
        initialValues={{ name: "" }}
        validationSchema={validateFolderAdd}
        validateOnChange={false}
        onSubmit={(folder, { setSubmitting }) => {
          setSubmitting(false);
          saveFolder(folder)
            .then((res) => {
              let newItem = res.data;
              setFolders((prevItems) => [...prevItems, newItem]);
            })
            .catch((err) => {
              console.error(err);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="d-flex mt-2 mb-1">
              <Field
                className="form-control mx-1"
                name="name"
                type="text"
                placeholder="Folder to add"
              />
              <button
                className="btn btn-secondary mx-1"
                type="submit"
                disabled={isSubmitting}
              >
                Add
              </button>
            </div>
            <ErrorMessage
              className="text-danger small ms-2"
              name="name"
              component="div"
            />
          </Form>
        )}
      </Formik>
      <nav>
        <ul className="nav flex-column mx-2">
          <li className="nav-item">
            <NavLink
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
              to={`/`}
            >
              All
            </NavLink>
          </li>
          <hr className="m-0" />
          {folders.length ? (
            folders.map((folder) => (
              <li key={folder.id}>
                <NavLink
                  to={`folders/${folder.name}`}
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                >
                  {folder.name}
                </NavLink>
              </li>
            ))
          ) : (
            <p></p>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default FolderList;
