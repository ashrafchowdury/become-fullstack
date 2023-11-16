import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Label, useToast } from "../interfaces";
import { useAuth } from "../context/AuthContext";
import { cn } from "../lib/utils";

const UserCredientials = ({
  className,
  isDisabled,
}: {
  className?: string;
  isDisabled: boolean;
}) => {
  const [info, setInfo] = useState<any>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });
  const { isLoading, currentUser } = useAuth();

  const handleInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  return (
    <section className={cn("w-[600px] space-y-4", className)}>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          name="name"
          className="px-4 py-2 w-full"
          value={info.name}
          onChange={handleInfo}
          disabled={isDisabled}
          placeholder="Add you real Name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          className="px-4 py-2 w-full"
          value={info.email}
          onChange={handleInfo}
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
          value={info.phone}
          onChange={handleInfo}
          disabled={isDisabled}
          placeholder="Active Phone"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          name="address"
          className="px-4 py-2 w-full"
          value={info.address}
          onChange={handleInfo}
          disabled={isDisabled}
          placeholder="Delivary Address"
        />
      </div>

      <div className="flex items-center space-x-2 w-full">
        <div className="space-y-2 w-full">
          <Label htmlFor="city">City</Label>
          <Input
            name="city"
            className="px-4 py-2"
            value={info.city}
            onChange={handleInfo}
            disabled={isDisabled}
            placeholder="City name"
          />
        </div>
        <div className="space-y-2 w-full">
          <Label htmlFor="city">State</Label>
          <Input
            name="state"
            className="px-4 py-2"
            value={info.state}
            onChange={handleInfo}
            disabled={isDisabled}
            placeholder="State in city"
          />
        </div>
      </div>
    </section>
  );
};

export default UserCredientials;
