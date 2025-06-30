
import { Camera, Upload } from 'lucide-react';

const NewPost = () => {
  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <img 
        src="https://sailorsahoy.com/assets/img/logo.png" 
        alt="Logo"
        className="h-[50px] object-contain mx-auto mb-8"
      />
      
      <h1 className="text-2xl font-semibold mb-8">New Post</h1>
      
      <div className="space-y-6">
        <button className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
          <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p className="text-gray-600">Upload from Gallery</p>
        </button>
        
        <button className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
          <Camera className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p className="text-gray-600">Take Photo</p>
        </button>
      </div>
    </div>
  );
};

export default NewPost;
