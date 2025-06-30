
import { useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import Layout from '../components/Layout';
import Home from './Home';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default Index;
