import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { toast } from "react-toastify";

const FamilyUpdateModal = ({ idName, refetch }) => {
  const [family, setFamily] = useState({});
  const [fullName, setfullName] = useState(null);
  const [position, setposition] = useState(null);
  const [facebook, setfacebook] = useState(null);
  const [whatsapp, setwhatsapp] = useState(null);
  const [instagram, setinstagram] = useState(null);

  const url = `https://rokto-bondon-server.vercel.app/family-member-single/${idName}`;
  useEffect(() => {
    setFamily(idName);
    setfullName(idName.fullName);
    setposition(idName.position);
    setfacebook(idName.facebook);
    setwhatsapp(idName.whatsapp);
    setinstagram(idName.instagram);
  }, [idName]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const HandleUpdateMember = (e) => {
    e.preventDefault();
    const member = {
      fullName,
      position,
      facebook,
      whatsapp,
      instagram,
    };

    const url = `https://rokto-bondon-server.vercel.app/update-family-member/${family?._id}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(member),
    })
      .then((res) => res.json())
      .then((member) => {
        if (member.acknowledged) {
          swal("", "Success", "success");
          refetch();
        }
      });
  };

  const imgUrl = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imageKey}`;

  const HandleUpdatePhoto = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    fetch(imgUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const photo = {
            image: result?.data?.url,
          };

          fetch(
            `https://rokto-bondon-server.vercel.app/update-family-member/${family?._id}`,
            {
              method: "PUT",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(photo),
            }
          )
            .then((res) => res.json())
            .then((photo) => {
              if (photo?.modifiedCount) {
                toast.success("photo updated");
              }
            });
        }
      });
  };

  return (
    <div>
      <div>
        <input
          type="checkbox"
          id="family-update-modal"
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box w-2/3 md:w-2/4 sm:modal-middle max-w-5xl">
            <label
              htmlFor="family-update-modal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="font-bold text-lg">Update Member info</h3>
            <span className="divider mt-1"></span>
            <div>
              <form onSubmit={HandleUpdateMember}>
                <div className="form-control w-full max-w-md">
                  <label className="label">
                    <span className="label-text">
                      Name <span className="text-red-400">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-md"
                    value={fullName}
                    onChange={(e) => setfullName(e.target.value)}
                  />
                </div>
                <div className="form-control w-full max-w-md">
                  <label className="label">
                    <span className="label-text">
                      Position <span className="text-red-400">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-md"
                    value={position}
                    onChange={(e) => setposition(e.target.value)}
                  />
                </div>
                <div className="form-control w-full max-w-md">
                  <label className="label">
                    <span className="label-text">Facebook Id</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-md"
                    value={facebook}
                    onChange={(e) => setfacebook(e.target.value)}
                  />
                </div>
                <div className="form-control w-full max-w-md">
                  <label className="label">
                    <span className="label-text">whatsapp Number</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-md"
                    value={whatsapp}
                    onChange={(e) => setwhatsapp(e.target.value)}
                  />
                </div>
                <div className="form-control w-full max-w-md">
                  <label className="label">
                    <span className="label-text">Instagram Id</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-md"
                    value={instagram}
                    onChange={(e) => setinstagram(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value={"Update"}
                  className="btn mt-2 btn-bordered w-full max-w-md"
                />
              </form>
            </div>
            <div className="mt-5">
              {/* for image update form */}
              <h3 className="font-bold text-lg">Update Photo</h3>
              <span className="divider my-1"></span>
              <form onSubmit={handleSubmit(HandleUpdatePhoto)}>
                <div className="form-control w-full max-w-md">
                  <label className="label">
                    <span className="label-text">
                      Donor Photo
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
                  type={"submit"}
                  defaultValue="update photo"
                  className="btn btn-danger text-white"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyUpdateModal;
