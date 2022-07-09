const Loader = () => {
  return (
    <div className="flex flex-col gap-8 
    justify-center items-center mt-72">
      <span className="font-semibold">
        Gegevens aan het laden...
      </span>
      <div className="animate-spin rounded-full 
        h-10 w-10 border-dark border-b-2"></div>
    </div>
  );
};

export default Loader;
