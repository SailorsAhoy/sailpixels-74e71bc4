
const Search = () => {
  const images = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-1">
        {images.map((num) => (
          <div key={num} className="aspect-square">
            <img
              src={`https://sailorsahoy.com/pixel/img/${num}.jpg`}
              alt={`Search result ${num}`}
              className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
