import React from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Heading from "../../Shared/Heading";

const AddFamilyMember = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const imgUrl = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imageKey}`;

  const HandleAddMember = (data) => {
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
          const member = {
            image: result?.data?.url,
            fullName: data.fullName,
            position: data.position,
            facebook: data.facebook,
            whatsapp: data.whatsapp,
            instagram: data.instagram,
          };

          fetch("http://localhost:5000/add-family-member", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(member),
          })
            .then((res) => res.json())
            .then((member) => {
              if (member?.insertedId) {
                swal(
                  "Successfully added",
                  `${member?.fullName} added`,
                  "success"
                );
                reset();
              }
            });
        }
      });
  };

  return (
    <div className="pb-8">
      <Heading>Add Family Member</Heading>
      <form onSubmit={handleSubmit(HandleAddMember)}>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">
              Name <span className="text-red-400">*</span>
            </span>
          </label>
          <input
            {...register("fullName", { required: true })}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-md"
          />
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">
              Position <span className="text-red-400">*</span>
            </span>
          </label>
          <input
            {...register("position", { required: true })}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-md"
          />
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Facebook Id</span>
          </label>
          <input
            {...register("facebook")}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-md"
          />
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">whatsapp Number</span>
          </label>
          <input
            {...register("whatsapp")}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-md"
          />
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Instagram Id</span>
          </label>
          <input
            {...register("instagram")}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-md"
          />
        </div>

        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">
              Photo
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
          className="btn btn-bordered w-full max-w-md"
        />
      </form>
    </div>
  );
};

export default AddFamilyMember;
