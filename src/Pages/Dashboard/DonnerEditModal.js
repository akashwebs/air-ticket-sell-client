import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import swal from "sweetalert";
import Loading from "../../Shared/Loading";
import { toast } from "react-toastify";

const DonnerEditModal = ({ donnerId, refetch }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [donner, setDonner] = useState();
  const [isLoding, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const date = format(startDate, "PP");
  useEffect(() => {
    setIsLoading(true);
    const url = `http://localhost:5000/donnerProfile/${donnerId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDonner(data);
        setStartDate(new Date(data?.birthday));
        setIsLoading(0);
      });
  }, [donnerId]);
  /* 
  if (isLoding) {
    return <Loading></Loading>;
  }
 */
  /* const {
    address,
    birthday,
    bloodGroup,
    distric,
    donationCount,
    elegibale,
    email,
    fbID,
    fullName,
    img,
    phone,
    gender,
  } = donner;
  console.log(startDate, birthday); */
  // update profile

  const imgUrl = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imageKey}`;

  const HandleUpdateProfilePhoto = (data) => {
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
            img: result?.data?.url,
          };

          fetch(`http://localhost:5000/updateProfile/${donnerId}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(photo),
          })
            .then((res) => res.json())
            .then((photo) => {
              console.log(photo);
              if (photo?.modifiedCount) {
                toast.success("profile updated");
                reset();
                refetch();
              }
            });
        }
      });
  };
  const HandleUpdateProfile = (data) => {
    const updateDonner = {
      fullName: data.fullName,
      bloodGroup: data.bloodGroup,
      distric: data.distric,
      address: data.address,
      donationCount: data.donationCount,
      email: data.email,
      phone: data.phone,
      fbID: data.fbID,
      birthday: date,
      elegibale: data.elegibale,
      gender: data.gender,
      approved: true,
    };

    fetch(`http://localhost:5000/updateProfile/${donnerId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateDonner),
    })
      .then((res) => res.json())
      .then((profile) => {
        if (profile?.modifiedCount) {
          toast.success("profile updated");
          refetch();
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="donner_edit_modal" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box w-2/3 md:w-2/4 sm:modal-middle max-w-5xl">
          <label
            for="donner_edit_modal"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="font-bold text-lg">Update Profile</h3>
          <span className="divider mt-1"></span>
          <form onSubmit={handleSubmit(HandleUpdateProfile)}>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <div class="form-control w-full max-w-sm">
                  <label class="label">
                    <span class="label-text">
                      Full Name <span className="text-red-400">*</span>
                    </span>
                  </label>
                  <input
                    defaultValue={donner?.fullName}
                    {...register("fullName", { required: true })}
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full max-w-sm"
                  />
                  <label class="label">
                    <span class="label-text-alt text-red-600">
                      {errors.fullName?.type === "required" &&
                        "name is required Ex: Akash Shil"}
                    </span>
                  </label>
                </div>

                <div class="form-control w-full max-w-sm">
                  <label class="label">
                    <span class="label-text">
                      Blood Group <span className="text-red-400">*</span>{" "}
                    </span>
                  </label>
                  <select
                    defaultValue={donner?.bloodGroup}
                    {...register("bloodGroup", { required: true })}
                    class="select select-bordered"
                  >
                    <option value={"A+"}>A+</option>
                    <option value={"A-"}>A-</option>
                    <option value={"B+"}>B+</option>
                    <option value={"B-"}>B-</option>
                    <option value={"AB+"}>AB+</option>
                    <option value={"AB-"}>AB-</option>
                    <option value={"O+"}>O+</option>
                    <option value={"O-"}>O-</option>
                  </select>
                  <label class="label">
                    <span class="label-text-alt text-red-600">
                      {errors.bloodGroup?.type === "required" &&
                        "please Select any blood group"}
                    </span>
                  </label>
                </div>

                <div class="form-control w-full max-w-sm">
                  <label class="label">
                    <span class="label-text">Full Address </span>
                  </label>
                  <input
                    defaultValue={donner?.address}
                    {...register("address")}
                    type="text"
                    placeholder="ex: nawla/rahimanagar/kachua"
                    class="input input-bordered w-full max-w-sm"
                  />
                </div>

                <div class="form-control w-full max-w-sm">
                  <label class="label">
                    <span class="label-text">
                      Distric <span className="text-red-400">*</span>
                    </span>
                  </label>
                  <select
                    defaultValue={donner?.distric}
                    {...register("distric", { required: true })}
                    class="select select-bordered"
                  >
                    <option value={"Dhaka"}>Dhaka</option>
                    <option value={"Faridpur"}>Faridpur</option>
                    <option value={"Gazipur"}>Gazipur</option>
                    <option value={"Gopalganj"}>Gopalganj</option>
                    <option value={"Jamalpur"}>Jamalpur</option>
                    <option value={"Kishoreganj"}>Kishoreganj</option>
                    <option value={"Madaripur"}>Madaripur</option>
                    <option value={"Manikganj"}>Manikganj</option>
                    <option value={"Munshiganj"}>Munshiganj</option>
                    <option value={"Mymensingh"}>Mymensingh</option>
                    <option value={"Narayanganj"}>Narayanganj</option>
                    <option value={"Narsingdi"}>Narsingdi</option>
                    <option value={"Netrokona"}>Netrokona</option>
                    <option value={"Rajbari"}>Rajbari</option>
                    <option value={"Shariatpur"}>Shariatpur</option>
                    <option value={"Sherpur"}>Sherpur</option>
                    <option value={"Tangail"}>Tangail</option>
                    <option value={"Bogra"}>Bogra</option>
                    <option value={"Joypurhat"}>Joypurhat</option>
                    <option value={"Naogaon"}>Naogaon</option>
                    <option value={"Natore"}>Natore</option>
                    <option value={"Nawabganj"}>Nawabganj</option>
                    <option value={"Pabna"}>Pabna</option>
                    <option value={"Rajshahi"}>Rajshahi</option>
                    <option value={"Sirajgonj"}>Sirajgonj</option>
                    <option value={"Dinajpur"}>Dinajpur</option>
                    <option value={"Gaibandha"}>Gaibandha</option>
                    <option value={"Kurigram"}>Kurigram</option>
                    <option value={"Lalmonirhat"}>Lalmonirhat</option>
                    <option value={"Nilphamari"}>Nilphamari</option>
                    <option value={"Panchagarh"}>Panchagarh</option>
                    <option value={"Rangpur"}>Rangpur</option>
                    <option value={"Thakurgaon"}>Thakurgaon</option>
                    <option value={"Barguna"}>Barguna</option>
                    <option value={"Barisal"}>Barisal</option>
                    <option value={"Bhola"}>Bhola</option>
                    <option value={"Jhalokati"}>Jhalokati</option>
                    <option value={"Patuakhali"}>Patuakhali</option>
                    <option value={"Pirojpur"}>Pirojpur</option>
                    <option value={"Bandarban"}>Bandarban</option>
                    <option value={"Brahmanbaria"}>Brahmanbaria</option>
                    <option value={"Chandpur"}>Chandpur</option>
                    <option value={"Chittagong"}>Chittagong</option>
                    <option value={"Comilla"}>Comilla</option>
                    <option value={"Cox"}>Cox</option>''s Bazar
                    <option value={"Feni"}>Feni</option>
                    <option value={"Khagrachari"}>Khagrachari</option>
                    <option value={"Lakshmipur"}>Lakshmipur</option>
                    <option value={"Noakhali"}>Noakhali</option>
                    <option value={"Rangamati"}>Rangamati</option>
                    <option value={"Habiganj"}>Habiganj</option>
                    <option value={"Maulvibazar"}>Maulvibazar</option>
                    <option value={"Sunamganj"}>Sunamganj</option>
                    <option value={"Sylhet"}>Sylhet</option>
                    <option value={"Bagerhat"}>Bagerhat</option>
                    <option value={"Chuadanga"}>Chuadanga</option>
                    <option value={"Jessore"}>Jessore</option>
                    <option value={"Jhenaidah"}>Jhenaidah</option>
                    <option value={"Khulna"}>Khulna</option>
                    <option value={"Kushtia"}>Kushtia</option>
                    <option value={"Magura"}>Magura</option>
                    <option value={"Meherpur"}>Meherpur</option>
                    <option value={"Narail"}>Narail</option>
                    <option value={"Satkhira"}>Satkhira</option>
                  </select>
                  <label class="label">
                    <span class="label-text-alt text-red-600">
                      {errors.distric?.type === "required" &&
                        "please Select any blood group"}
                    </span>
                  </label>
                </div>

                <div class="form-control w-full max-w-sm">
                  <label class="label">
                    <span class="label-text">
                      Elegibale <span className="text-red-400">*</span>
                    </span>
                  </label>
                  <select
                    defaultValue={donner?.elegibale}
                    {...register("elegibale", { required: true })}
                    class="select select-bordered"
                  >
                    <option value={"Yes"}>Yes</option>
                    <option value={"No"}>No</option>
                  </select>
                  <label class="label">
                    <span class="label-text-alt text-red-600">
                      {errors.elegibale?.type === "required" &&
                        "please Select yes/no"}
                    </span>
                  </label>
                </div>
              </div>
              {/* second div */}

              <div>
                <div class="form-control w-full max-w-sm">
                  <label class="label">
                    <span class="label-text">
                      Gender <span className="text-red-400">*</span>
                    </span>
                  </label>
                  <select
                    defaultValue={donner?.gender}
                    {...register("gender", { required: true })}
                    class="select select-bordered"
                  >
                    <option value={"male"}>male</option>
                    <option value={"female"}>female</option>
                  </select>
                  <label class="label">
                    <span class="label-text-alt text-red-600">
                      {errors.gender?.type === "required" &&
                        "please Select any blood group"}
                    </span>
                  </label>
                </div>
                <div class="form-control w-full max-w-sm">
                  <label class="label">
                    <span class="label-text">Birthday Date:</span>
                  </label>

                  <DatePicker
                    selected={startDate}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(date) => setStartDate(date)}
                  />
                </div>

                <div class="form-control w-full max-w-sm">
                  <label class="label">
                    <span class="label-text">
                      Phone Number <span className="text-red-400">*</span>
                    </span>
                  </label>

                  <input
                    defaultValue={donner?.phone}
                    {...register("phone", { required: true })}
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full max-w-sm"
                  />
                </div>

                <div class="form-control w-full max-w-sm">
                  <label class="label">
                    <span class="label-text">Email Address</span>
                  </label>

                  <input
                    defaultValue={donner?.email}
                    disabled
                    type="email"
                    {...register("email")}
                    placeholder="Type here"
                    class="input input-bordered w-full max-w-sm"
                  />
                </div>

                <div class="form-control w-full max-w-md">
                  <label class="label">
                    <span class="label-text">কতবার রক্ত দিয়েছেন?</span>
                  </label>

                  <input
                    defaultValue={donner?.donationCount}
                    type="number"
                    {...register("donationCount")}
                    placeholder="Type Number"
                    class="input input-bordered w-full max-w-md"
                  />
                </div>
                <div class="form-control w-full max-w-md">
                  <label class="label">
                    <span class="label-text">Facebook Id profile URL</span>
                  </label>

                  <input
                    defaultValue={donner?.fbID}
                    type="text"
                    {...register("fbID")}
                    placeholder="please copy/paste fb url"
                    class="input input-bordered w-full max-w-md"
                  />
                </div>
              </div>
            </div>
            <div>
              <input
                type={"submit"}
                value="Update profile"
                className="btn btn-success w-full text-white mt-3"
              />
            </div>
          </form>

          <div className="mt-5">
            {/* for image update form */}
            <h3 class="font-bold text-lg">Update Profile Photo</h3>
            <span className="divider my-1"></span>
            <form onSubmit={handleSubmit(HandleUpdateProfilePhoto)}>
              <div class="form-control w-full max-w-md">
                <label class="label">
                  <span class="label-text">
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
                value="update photo"
                className="btn btn-success text-white"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonnerEditModal;
