import { useNavigate } from "react-router-dom";
import { Button } from "../interfaces";
import { ArrowBigLeft } from "lucide-react";
import { cn } from "../lib/utils";

const GoBack = ({ className, link }: { className?: string; link: string }) => {
  const navigate = useNavigate();

  return (
    <Button
      size="icon"
      className={cn("w-8 h-8 bg-border", className)}
      onClick={() => navigate(link)}
    >
      <ArrowBigLeft className="w-5 h-5" />
    </Button>
  );
};

export default GoBack;
