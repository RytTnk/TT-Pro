import React, { useState } from 'react';
import Layout from './components/Layout';
import FitnessView from './components/FitnessView';
import AeroView from './components/AeroView';
import StrategyView from './components/StrategyView';
import DocumentationView from './components/DocumentationView';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.FITNESS);

  const renderContent = () => {
    switch (currentView) {
      case AppView.FITNESS:
        return <FitnessView />;
      case AppView.AERO:
        return <AeroView />;
      case AppView.STRATEGY:
        return <StrategyView />;
      case AppView.DOCS:
        return <DocumentationView />;
      default:
        return <FitnessView />;
    }
  };

  return (
    <Layout currentView={currentView} onChangeView={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

export default App;