import React from "react";
import { Input, Button, Label } from "../interfaces";
import { cn } from "../lib/utils";
import { useAuth } from "../context/AuthContext";

type StateType = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

const UserCredientials = ({
  className,
  isDisabled,
  state,
  setState,
}: {
  className?: string;
  isDisabled: boolean;
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
}) => {
  const { currentUser } = useAuth();
  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <section className={cn("w-[600px] space-y-4", className)}>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          name="name"
          className="px-4 py-2 w-full"
          value={state.name}
          onChange={handleChanges}
          disabled={isDisabled}
          placeholder="Add you real Name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          className="px-4 py-2 w-full"
          value={state.email}
          onChange={handleChanges}
          disabled={isDisabled}
          placeholder="Contact Email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          type="phone"
          name="phone"
          className="px-4 py-2 w-full"
          value={state.phone}
          onChange={handleChanges}
          disabled={isDisabled}
          placeholder="Active Phone"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Full Address</Label>
        <Input
          name="address"
          className="px-4 py-2 w-full"
          value={state.address}
          onChange={handleChanges}
          disabled={isDisabled}
          placeholder="Delivary Address"
        />
      </div>
    </section>
  );
};

export default UserCredientials;
