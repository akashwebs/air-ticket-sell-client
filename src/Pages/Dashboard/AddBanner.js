import React from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Heading from "../../Shared/Heading";

const AddBanner = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const imgUrl = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imageKey}`;

  const HandleAddBanner = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    fetch(imgUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success || data?.url) {
          const banner = {
            bannerImage: result?.data?.url,
            bannerName: data.bannerName,
            extraUrl: data.url,
            hide: false,
            orders: 1,
          };

          fetch("http://localhost:5000/addBanner", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(banner),
          })
            .then((res) => res.json())
            .then((bannerResult) => {
              if (bannerResult?.insertedId) {
                swal(
                  "Successfully added",
                  `${banner?.bannerName} added`,
                  "success"
                );
                // setLoading(false);
                reset();
              }
            });
        }
      });
  };

  return (
    <div>
      <Heading>Add Banner</Heading>
      <form onSubmit={handleSubmit(HandleAddBanner)}>
        <div class="form-control w-full max-w-md">
          <label class="label">
            <span class="label-text">
              Banner Titile <span className="text-red-400">*</span>
            </span>
          </label>
          <input
            type="text"
            {...register("bannerName")}
            placeholder="Enter Banner title"
            class="input input-bordered w-full max-w-md"
          />
        </div>
        <div class="form-control w-full max-w-md">
          <label class="label">
            <span class="label-text">
              Extarnal photo URL
              <small>
                (if you dont upload photo, you can use extranal photo url)
              </small>
            </span>
          </label>

          <input
            type="text"
            {...register("url")}
            placeholder="enter copy/paste photo url"
            class="input input-bordered w-full max-w-md"
          />
        </div>
        <div class="form-control w-full max-w-md">
          <label class="label">
            <span class="label-text">
              Slider Photo
              <small className="font-bold text-green-500">
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
          value={"Submit"}
          class="btn btn-bordered w-full max-w-md"
        />
      </form>
    </div>
  );
};

export default AddBanner;
