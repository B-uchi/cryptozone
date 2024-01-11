type prop = {
  text: string;
};

const MenuItem = (props: prop) => {
  const { text } = props;
  return (
    <div className="group cursor-pointer transition duration-300">
      {text}{" "}
      <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black dark:bg-white"></span>
    </div>
  );
};

export default MenuItem;
