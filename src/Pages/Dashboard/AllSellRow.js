import React from "react";

import { toast } from "react-toastify";
import swal from "sweetalert";

const AllSellRow = ({ sell, refetch, currentRefetch }) => {
  const handleDeleteSell = () => {
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover " "`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const deleteurl = `http://localhost:5000/delete-sell/${sell?._id}`;
        fetch(deleteurl, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            refetch();
            const newCurrentBalance =
              parseFloat(sell.currentBalance) -
              parseFloat(sell.drtaka) +
              parseFloat(sell.crtaka);

            const balance = {
              currentBalance: newCurrentBalance,
              email: "akash@gmail.com",
            };

            fetch("http://localhost:5000/add-current-balance/akash@gmail.com", {
              method: "PUT",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(balance),
            })
              .then((res) => res.json())
              .then((balance) => {
                console.log(balance);
                if (balance?.acknowledged) {
                  toast("closing balance updated ");
                  currentRefetch();
                }
              });
          });

        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal(`file is safe!`);
      }
    });
  };

  return (
    <tr>
      <th>{sell?.sl}</th>
      <td>{sell?.date}</td>
      <td>
        <p>Fax Name:{sell?.faxname}</p>
        <p>pyment System:{sell?.payment}</p>
      </td>

      <td>{sell?.pnr}</td>
      <td>{sell?.drtaka}</td>
      <td>{sell?.crtaka}</td>

      <td className="font-bold">{sell.currentBalance}</td>
      <td>
        <button onClick={handleDeleteSell} className="btn btn-danger btn-sm">
          delete
        </button>
      </td>
    </tr>
  );
};

export default AllSellRow;
