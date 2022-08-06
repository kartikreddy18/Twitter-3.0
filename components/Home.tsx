import Banner from "./Heading";
import TweetBox from "./TweetBox";

const Home = () => {
  return (
    <div className="w-full p-2">
      <Banner title={"Home"} />
      <TweetBox />
    </div>
  );
};

export default Home;
