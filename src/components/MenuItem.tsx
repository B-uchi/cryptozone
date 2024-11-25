interface MenuItemProps {
  text: string;
}

const MenuItem = ({ text }: MenuItemProps) => {
  return (
    <div className="relative group">
      <span className="text-gray-800 dark:text-gray-200 font-medium transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
        {text}
      </span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full" />
    </div>
  );
};

export default MenuItem;
