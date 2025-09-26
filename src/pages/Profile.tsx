
const Profile = () => {
  const galleryImages = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Profile Header */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <img 
            src="https://sailorsahoy.com/icon_whitecircle.png" 
            alt="SailorsAhoy Logo" 
            className="w-16 h-16 rounded-full"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">SailorsAhoy</h1>
        <p className="text-gray-600 mb-2">The platform for sailors and sailing enthusiasts</p>
        <a 
          href="https://sailorsahoy.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 text-sm hover:underline"
        >
          sailorsahoy.com
        </a>
      </div>

      {/* Stats */}
      <div className="flex justify-around mb-8 bg-gray-50 py-4 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">42</div>
          <div className="text-gray-600 text-sm">published</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">1.2K</div>
          <div className="text-gray-600 text-sm">followers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">328</div>
          <div className="text-gray-600 text-sm">following</div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-3 gap-1">
        {galleryImages.map((num) => (
          <div key={num} className="aspect-square overflow-hidden bg-gray-200 flex items-center justify-center">
            <img
              src={`https://sailorsahoy.com/pixel/img/${num}.jpg`}
              alt={`Gallery ${num}`}
              className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
              loading="lazy"
              onError={(e) => {
                console.log(`Failed to load image ${num}`);
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent && !parent.querySelector('.fallback-text')) {
                  const fallbackText = document.createElement('div');
                  fallbackText.className = 'fallback-text text-gray-500 text-xs text-center';
                  fallbackText.textContent = `Gallery ${num}`;
                  parent.appendChild(fallbackText);
                }
              }}
              onLoad={() => {
                console.log(`Successfully loaded image ${num}`);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
