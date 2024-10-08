import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const UserProfile: React.FC = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const localEmail = Cookies.get("userEmail");
  const localName = Cookies.get("fullName");
  useEffect(() => {
    if (localEmail) {
      setEmail(localEmail);
    }
    if (localName) {
      setFullName(localName);
    }
  }, [localEmail]);

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-1/2 bg-white p-4 m-4">
          <h1 className="text-2xl font-bold">Profile</h1>
          <div className="flex justify-between">
            <p>Email:</p>
            <p>{email}</p>
          </div>
          <div className="flex justify-between">
            <p>Full Name:</p>
            <p>{fullName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
