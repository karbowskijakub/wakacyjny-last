import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { postLogout } from "@/api/api";

const ProfileSidebar = () => {
  const navigate = useNavigate();
  
  const mutation = useMutation({
    mutationFn: postLogout,
    onSuccess: (data) => {
      console.log("Logout successful:", data);
      navigate('/login');
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // Handle error, maybe show a notification or alert
    },
  });

  // Function to handle the button click
  function onClickBtn() {
    mutation.mutate();
  }

  return (
    <div className="h-full w-96 py-3">
      <div className="h-full rounded-md p-5 shadow-md dark:shadow-zinc-800">
       <p> Hello</p>
      </div>
    </div>
  );
};

export default ProfileSidebar;