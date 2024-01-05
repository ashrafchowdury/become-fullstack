import { Avatar as Continer, AvatarFallback, AvatarImage } from "../interfaces";
import { cn } from "../lib/utils";

type AvatarType = {
  img?: string;
  fallback: string;
  className?: string;
};

const Avatar = ({ img, fallback, className }: AvatarType) => {
  return (
    <Continer className={cn("w-16 h-16", className)}>
      <AvatarImage src={img} alt={fallback} />
      <AvatarFallback className="font-bold w-full h-full bg-border uppercase">
        {fallback?.slice(0, 2)}
      </AvatarFallback>
    </Continer>
  );
};

export default Avatar;
