
const Profile = () => {
  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center space-x-4 mb-6">
        <img 
          src="https://sailorsahoy.com/icon_whitecircle.png" 
          alt="SailorsAhoy Avatar"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h1 className="text-xl font-semibold">SailorsAhoy</h1>
          <p className="text-gray-600">The platform for sailors and sailing enthusiasts</p>
          <a 
            href="https://sailorsahoy.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 text-sm hover:underline"
          >
            sailorsahoy.com
          </a>
        </div>
      </div>
      
      <div className="flex justify-around py-4 border-y border-gray-200 mb-6">
        <div className="text-center">
          <div className="text-xl font-semibold">42</div>
          <div className="text-sm text-gray-600">published</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-semibold">1.2K</div>
          <div className="text-sm text-gray-600">followers</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-semibold">328</div>
          <div className="text-sm text-gray-600">following</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
          <div key={num} className="aspect-square">
            <img
              src={`https://sailorsahoy.com/pixel/img/${num}.jpg`}
              alt={`Gallery ${num}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
