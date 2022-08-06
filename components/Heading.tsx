import { BsStars } from "react-icons/bs";

type Props = {
  title: string;
};

const Banner = ({ title }: Props) => {
  return (
    <div className="text-gray-200 font-semibold text-lg flex bg-gray-800 justify-between p-5 rounded select-none">
      {title}
      <BsStars size="1.9rem" />
    </div>
  );
};

export default Banner;
