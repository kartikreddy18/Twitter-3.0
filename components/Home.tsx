import Banner from "./Heading";
import TweetBox from "./TweetBox";
import TweetFeed from "./TweetFeed";

const Home = () => {
  return (
    <div className="w-full p-2 overflow-y-scroll scrollbar-hide">
      <Banner title={"Home"} />
      <TweetBox />
      <TweetFeed profile={""} />
    </div>
  );
};

export default Home;
