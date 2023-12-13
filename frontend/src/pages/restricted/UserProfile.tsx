import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../interfaces";
import { useAuth } from "../../context/AuthContext";
import UserCredientials from "../../components/UserCredientials";

const UserProfile = () => {
  const [isEdit, setIsEdit] = useState(true);
  const { currentUser } = useAuth();
  const [details, setDetailse] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone as string,
    address: currentUser.address as string,
  });

  return (
    <main className="w-[600px] flex flex-col items-center mx-auto">
      <img
        src="https://th.bing.com/th/id/OIP.WJrIBdWMZQfSlBeZpgWlqQHaHa?rs=1&pid=ImgDetMain"
        alt="userr image"
        className=" w-28 h-28 rounded-lg object-cover !mb-6 mt-20"
      />
      <UserCredientials
        className="w-full"
        isDisabled={isEdit}
        state={details}
        setState={setDetailse}
      />
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
