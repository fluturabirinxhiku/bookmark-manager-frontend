import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import BookmarkAdd from "./BookmarkAdd";
import {
  getAllBookmarks,
  getAllBookmarksByFolder,
} from "../services/bookmarkService";
import { useParams } from "react-router-dom";

const BookmarkList = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const { folderName } = useParams();
  const fetchBookmarks = async (name) => {
    try {
      let response;
      if (name) {
        response = await getAllBookmarksByFolder(name);
      } else {
        response = await getAllBookmarks();
      }
      setBookmarks(response.data);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  useEffect(() => {
    fetchBookmarks(folderName);
  }, [folderName]);

  const columns = [
    { header: "Title", accessorKey: "title" },
    { header: "URL", accessorKey: "url" },
    { header: "Description", accessorKey: "description" },
  ];

  const table = useReactTable({
    data: bookmarks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="row">
        <BookmarkAdd setBookmarks={setBookmarks} />
      </div>
      <div className="row">
        <table className="bookmarkList table table-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} scope="col" className="auto">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookmarkList;
