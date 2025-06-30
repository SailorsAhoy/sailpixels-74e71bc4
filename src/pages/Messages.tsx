
const Messages = () => {
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Messages</h1>
      
      <div className="space-y-4">
        {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
          <div key={num} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <h3 className="font-medium">User {num}</h3>
              <p className="text-sm text-gray-600">Last message preview...</p>
            </div>
            <div className="text-xs text-gray-400">2h</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
