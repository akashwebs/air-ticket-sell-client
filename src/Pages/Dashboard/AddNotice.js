import React from "react";
import swal from "sweetalert";
import Heading from "../../Shared/Heading";

const AddNotice = () => {
  const handleNotice = (e) => {
    e.preventDefault();
    if (e.target.notice.value.length < 1) {
      alert("please write some notice ");
      return;
    }
    const notice = { notice: e.target.notice.value };

    const url = `https://rokto-bondon-server.vercel.app/notice`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(notice),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          swal("", "", "success");
          e.target.notice.value = "";
        }
      });
  };

  return (
    <div>
      <Heading>Notice</Heading>

      <div className="card md:w-1/2 w-full bg-base-100 shadow-xl">
        <form onSubmit={handleNotice} className="card-body">
          <textarea
            className="textarea textarea-primary"
            placeholder="write notice"
            rows={12}
            name="notice"
          ></textarea>
          <div className="card-actions justify-end">
            <button type="submit" className="btn btn-primary text-white">
              Add Notice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotice;
