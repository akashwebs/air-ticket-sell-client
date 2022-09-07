import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import swal from "sweetalert";
import Heading from "../../Shared/Heading";
import Post from "./Post";

const AllPost = () => {
  const handleDeletePost = (id) => {
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover " "`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `http://localhost:5000/delete-post/${id}`;
        fetch(url, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            refetch();
          });

        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal(`file is safe!`);
      }
    });
  };

  let url = `http://localhost:5000/all-post`;

  const {
    isLoading,
    error,
    data: posts,
    refetch,
  } = useQuery(["all-post-for-everytime"], () =>
    fetch(url).then((res) => res.json())
  );
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(posts?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(posts?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, posts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % posts?.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Heading>All Post</Heading>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Titile</th>

              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post, index) => (
              <Post
                key={post?._id}
                post={post}
                index={index + 1}
                refetch={refetch}
                handleDeletePost={handleDeletePost}
              ></Post>
            ))}
          </tbody>

          <tfoot className="">
            <tr className="">
              {/* paginate */}
              <td colSpan={5} className="">
                <div className="">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=">>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    previousLabel="<<"
                    renderOnZeroPageCount={null}
                    containerClassName="btn-group pagination"
                    pageLinkClassName="btn btn-sm"
                    previousLinkClassName="btn-sm btn"
                    nextLinkClassName="btn btn-sm"
                    activeClassName="pagination-active"
                  />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default AllPost;
