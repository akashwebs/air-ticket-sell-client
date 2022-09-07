import React from "react";

const Post = ({ post, index, handleDeletePost }) => {
  return (
    <tr>
      <th>{index}</th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={post?.image} alt="member image" />
            </div>
          </div>
          <div>
            <div className="font-bold text-sm ">
              {post?.title.slice(0, 100)}...
            </div>
          </div>
        </div>
      </td>

      <td>
        <button
          onClick={() => handleDeletePost(post._id)}
          className="btn btn-warning btn-xs text-black ml-2"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Post;
