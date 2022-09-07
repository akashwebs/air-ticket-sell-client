import React, { useState } from "react";
import RichText from "./RichText";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Heading from "../../Shared/Heading";

const AddPost = () => {
  const [content, setContent] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const imgUrl = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imageKey}`;

  const HandleAddPost = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    fetch(imgUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        const posts = {
          image: result?.data?.url,
          title: data.titile,
          content: content,
        };

        fetch("http://localhost:5000/add-post", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(posts),
        })
          .then((res) => res.json())
          .then((postResult) => {
            if (postResult?.insertedId) {
              swal("Successfully added", ``, "success");
              // setLoading(false);
              reset();
            }
          });
      });
  };

  return (
    <div>
      <Heading>Add Post</Heading>
      <form onSubmit={handleSubmit(HandleAddPost)}>
        <div className="form-control w-full max-w-xl">
          <label className="label">
            <span className="label-text">
              Title <span className="text-red-400">*</span>
            </span>
          </label>
          <input
            type="text"
            {...register("titile")}
            placeholder="Enter Banner title"
            className="input input-bordered w-full max-w-xl"
            required
          />
        </div>
        <div className="form-control w-full max-w-xl my-3">
          <span className="label-text mb-2">
            Description <span className="text-red-400 mb-2">*</span>
          </span>
          <RichText setContent={setContent} />
        </div>
        <div className="form-control w-full max-w-xl">
          <label className="label">
            <span className="label-text">
              Features Image
              <small className="font-bold text-orange-500">
                (Photo size less then 700kb)
              </small>
            </span>
          </label>

          <input
            {...register("image")}
            type="file"
            className="input input-bordered mb-3 w-full "
          />
        </div>

        <input
          type="submit"
          value={"Publish"}
          className="btn btn-bordered w-full max-w-xl"
        />
      </form>
    </div>
  );
};

export default AddPost;
