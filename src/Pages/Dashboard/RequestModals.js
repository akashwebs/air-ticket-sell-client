import React from "react";

const RequestModals = ({ id }) => {
  const {
    fullName,
    phone,
    bloodGroup,
    img,
    distric,
    address,
    elegibale,
    email,
    birthday,
    fbID,
    donationCount,
  } = id;

  return (
    <div>
      <div>
        <input
          type="checkbox"
          id="request-approved-modal"
          class="modal-toggle"
        />
        <div class="modal">
          <div class="modal-box w-2/3 md:w-2/4 sm:modal-middle max-w-5xl">
            <label
              for="request-approved-modal"
              class="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 class="font-bold text-lg">Requested Profile Info</h3>
            <span className="divider mt-1"></span>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 gap-0">
              <div>
                <div class="overflow-x-auto">
                  <table class="table w-full">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Info</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>
                          {fullName ? (
                            fullName
                          ) : (
                            <button className="btn btn-xs bg-red-600">
                              Messing
                            </button>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td>
                          {phone ? (
                            phone
                          ) : (
                            <button className="btn btn-xs bg-red-600">
                              Messing
                            </button>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Blood Group</td>
                        <td>
                          {bloodGroup ? (
                            bloodGroup
                          ) : (
                            <button className="btn btn-xs bg-red-600">
                              Messing
                            </button>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Photo</td>
                        <td>
                          {img ? (
                            <div class="avatar">
                              <div class="mask mask-squircle w-12 h-12">
                                <img src={img} alt="profile" />
                              </div>
                            </div>
                          ) : (
                            <button className="btn btn-xs bg-red-600">
                              Messing
                            </button>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Distric</td>
                        <td>
                          {distric ? (
                            distric
                          ) : (
                            <button className="btn btn-xs bg-red-600">
                              Messing
                            </button>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* second table */}
              <div>
                <table class="table w-full">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Address</td>
                      <td>
                        {address ? (
                          address
                        ) : (
                          <button className="btn btn-xs bg-red-600">
                            Messing
                          </button>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Elegibale</td>
                      <td>
                        {elegibale ? (
                          phone
                        ) : (
                          <button className="btn btn-xs bg-red-600">
                            Messing
                          </button>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>
                        {email ? (
                          email
                        ) : (
                          <button className="btn btn-xs bg-red-600">
                            Messing
                          </button>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Birthday</td>
                      <td>
                        {birthday ? (
                          birthday
                        ) : (
                          <button className="btn btn-xs bg-red-600">
                            Messing
                          </button>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Facebook</td>
                      <td>
                        {fbID ? (
                          <a href={fbID} className="btn btn-xs btn-accent">
                            yes
                          </a>
                        ) : (
                          <button className="btn btn-xs bg-red-600">
                            Messing
                          </button>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Donation Time</td>
                      <td>
                        {donationCount ? (
                          donationCount
                        ) : (
                          <button className="btn btn-xs bg-red-600">
                            Messing
                          </button>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestModals;
