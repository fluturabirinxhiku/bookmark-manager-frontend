import { useContext, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { validateBookmarkAdd } from "../validation/validator";
import { saveBookmark } from "../services/bookmarkService";

import { FolderContext } from "../context/folderContext";

const BookmarkAdd = ({ setBookmarks }) => {
  const { folders } = useContext(FolderContext);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const openOffcanvas = () => {
    setShowOffcanvas(true);
  };

  const closeOffcanvas = () => {
    setShowOffcanvas(false);
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary float-end me-2 my-2 "
        onClick={openOffcanvas}
      >
        Add Bookmark
      </button>
      {showOffcanvas && (
        <div
          className="offcanvas offcanvas-end show"
          tabIndex="-1"
          id="offcanvas"
          aria-labelledby="offcanvasLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasLabel">
              Add Bookmark
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              onClick={closeOffcanvas}
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <Formik
              initialValues={{
                title: "",
                url: "",
                description: "",
                folder: "",
              }}
              validationSchema={validateBookmarkAdd}
              onSubmit={(bookmark, { setSubmitting }) => {
                setSubmitting(false);
                saveBookmark(bookmark)
                  .then((res) => {
                    let newItem = res.data;
                    setBookmarks((prevItems) => [...prevItems, newItem]);
                    closeOffcanvas();
                  })
                  .catch((error) => console.error(error));
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="form-group mb-3">
                    <label htmlFor="title">Title</label>
                    <Field
                      id="title"
                      type="text"
                      name="title"
                      className="form-control"
                    />

                    <ErrorMessage
                      className="text-danger small"
                      name="title"
                      component="div"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="url">URL</label>
                    <Field
                      id="url"
                      type="text"
                      name="url"
                      className="form-control"
                    />

                    <ErrorMessage
                      className="text-danger small"
                      name="url"
                      component="div"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <Field
                      id="description"
                      type="text"
                      name="description"
                      className="form-control"
                    />

                    <ErrorMessage
                      className="text-danger small"
                      name="description"
                      component="div"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="folder">Folder</label>
                    <Field
                      as="select"
                      id="folder"
                      name="folder"
                      className="form-control"
                    >
                      <option value="">None</option>
                      {folders.map((folder) => (
                        <option key={folder.id} value={folder.id}>
                          {folder.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      className="text-danger small"
                      name="folder"
                      component="div"
                    />
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-primary text-uppercase fw-bold mt-4"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Save Bookmark
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarkAdd;
