import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button, useToast } from "../../interfaces";
import { useAuth } from "../../context/AuthContext";
import UserCredientials from "../../components/UserCredientials";

const UserProfile = () => {
  const [isEdit, setIsEdit] = useState(true);
  const { getCurrentUser, currentUser } = useAuth();
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <main className="w-[600px] flex flex-col items-center mx-auto">
      <img
        src="https://th.bing.com/th/id/OIP.WJrIBdWMZQfSlBeZpgWlqQHaHa?rs=1&pid=ImgDetMain"
        alt="userr image"
        className=" w-28 h-28 rounded-lg object-cover !mb-6 mt-20"
      />
      <UserCredientials className="w-full" isDisabled={isEdit} />
      <div className="w-full flex space-x-2 mt-16">
        {isEdit ? (
          <>
            <Button className="w-full !py-5" variant="destructive">
              Log Out
            </Button>

            <Button className="w-full !py-5" onClick={() => setIsEdit(false)}>
              Edit Profile
            </Button>
          </>
        ) : (
          <Button className="w-full !py-5" onClick={() => setIsEdit(true)}>
            Save Profile
          </Button>
        )}
      </div>
    </main>
  );
};

export default UserProfile;
