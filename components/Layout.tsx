import React from 'react';
import { AppView } from '../types';
import { Activity, Wind, Map, FileText, Dumbbell, Menu } from 'lucide-react';
import { APP_NAME } from '../constants';

interface LayoutProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  children: React.ReactNode;
}

const NavItem = ({ 
  active, 
  onClick, 
  icon: Icon, 
  label 
}: { 
  active: boolean; 
  onClick: () => void; 
  icon: React.ElementType; 
  label: string; 
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 transition-colors duration-200 ${
      active 
        ? 'bg-blue-600/20 text-blue-400 border-r-2 border-blue-400' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium text-sm tracking-wide">{label}</span>
  </button>
);

const Layout: React.FC<LayoutProps> = ({ currentView, onChangeView, children }) => {
  return (
    <div className="flex h-full w-full bg-slate-950">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="text-white" size={20} />
            </div>
          <h1 className="text-xl font-bold text-slate-100 tracking-tighter">{APP_NAME}</h1>
        </div>

        <nav className="flex-1 mt-6 space-y-1">
          <NavItem 
            active={currentView === AppView.FITNESS} 
            onClick={() => onChangeView(AppView.FITNESS)} 
            icon={Dumbbell} 
            label="Fitness & Body" 
          />
          <NavItem 
            active={currentView === AppView.AERO} 
            onClick={() => onChangeView(AppView.AERO)} 
            icon={Wind} 
            label="Aero Lab" 
          />
          <NavItem 
            active={currentView === AppView.STRATEGY} 
            onClick={() => onChangeView(AppView.STRATEGY)} 
            icon={Map} 
            label="Race Strategy" 
          />
          <NavItem 
            active={currentView === AppView.DOCS} 
            onClick={() => onChangeView(AppView.DOCS)} 
            icon={FileText} 
            label="Dev Documentation" 
          />
        </nav>

        <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
            <p>v0.1.0 Beta</p>
            <p>Powered by Gemini 2.5</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-950 relative">
        {children}
      </main>
    </div>
  );
};

export default Layout;