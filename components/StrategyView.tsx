import React, { useState } from 'react';
import { MOCK_RACES } from '../constants';
import { getRaceStrategyAdvice, generateRaceSpecificWorkout } from '../services/geminiService';
import { RaceProfile } from '../types';
import { MapPin, Zap, Settings, ChevronRight, Loader2, FileText, Dumbbell } from 'lucide-react';

const StrategyView: React.FC = () => {
  const [selectedRace, setSelectedRace] = useState<RaceProfile>(MOCK_RACES[0]);
  const [aiOutput, setAiOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'strategy' | 'workout'>('strategy');

  const handleGenerateAdvice = async () => {
    setLoading(true);
    setAiOutput(null);
    const result = await getRaceStrategyAdvice(selectedRace, 265, 68); // Mock User FTP/Weight
    setAiOutput(result);
    setActiveTab('strategy');
    setLoading(false);
  };

  const handleGenerateWorkout = async () => {
    setLoading(true);
    setAiOutput(null);
    const result = await generateRaceSpecificWorkout(selectedRace);
    setAiOutput(result);
    setActiveTab('workout');
    setLoading(false);
  };

  // Simple Markdown renderer substitute for demo
  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, i) => {
        if (line.startsWith('##')) return <h3 key={i} className="text-xl font-bold text-blue-300 mt-4 mb-2">{line.replace('##', '')}</h3>;
        if (line.startsWith('**')) return <strong key={i} className="text-white block mt-2">{line.replace(/\*\*/g, '')}</strong>;
        if (line.startsWith('-')) return <li key={i} className="ml-4 text-slate-300">{line.replace('-', '')}</li>;
        return <p key={i} className="text-slate-300 mb-1">{line}</p>;
    });
  };

  return (
    <div className="flex-1 flex overflow-hidden">
        {/* Race Selector Sidebar */}
        <div className="w-80 bg-slate-900 border-r border-slate-800 overflow-y-auto">
            <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">Your Races</h2>
                <div className="space-y-3">
                    {MOCK_RACES.map(race => (
                        <button
                            key={race.id}
                            onClick={() => { setSelectedRace(race); setAiOutput(null); }}
                            className={`w-full text-left p-4 rounded-xl border transition-all ${
                                selectedRace.id === race.id 
                                ? 'bg-blue-600/10 border-blue-500 ring-1 ring-blue-500' 
                                : 'bg-slate-950 border-slate-800 hover:border-slate-600'
                            }`}
                        >
                            <h3 className="font-bold text-slate-200">{race.name}</h3>
                            <div className="flex items-center text-xs text-slate-500 mt-2 space-x-3">
                                <span className="flex items-center"><MapPin size={12} className="mr-1"/> {race.distanceKm}km</span>
                                <span className="flex items-center"><Zap size={12} className="mr-1"/> {race.elevationGainM}m</span>
                            </div>
                            <span className="inline-block mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900 px-2 py-1 rounded">
                                {race.type}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-950">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8 border-b border-slate-800 pb-6">
                    <h1 className="text-3xl font-bold text-white mb-2">{selectedRace.name}</h1>
                    <p className="text-slate-400">{selectedRace.description}</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                     <button 
                        onClick={handleGenerateAdvice}
                        disabled={loading}
                        className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white p-4 rounded-xl transition-colors font-medium"
                     >
                        {loading && activeTab === 'strategy' ? <Loader2 className="animate-spin" /> : <Settings size={20} />}
                        <span>AI Gear & Strategy</span>
                     </button>
                     
                     <button 
                        onClick={handleGenerateWorkout}
                        disabled={loading}
                        className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white p-4 rounded-xl transition-colors font-medium"
                     >
                        {loading && activeTab === 'workout' ? <Loader2 className="animate-spin" /> : <Dumbbell size={20} />}
                        <span>AI Race-Spec Workout</span>
                     </button>
                </div>

                {/* AI Output Section */}
                {aiOutput && (
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 animate-fade-in shadow-2xl shadow-black/50">
                        <div className="flex items-center space-x-3 mb-6 border-b border-slate-800 pb-4">
                            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                                <FileText className="text-white" size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Gemini Analysis</h3>
                                <p className="text-xs text-slate-400">Based on your fitness profile (265W FTP / 68kg)</p>
                            </div>
                        </div>
                        <div className="prose prose-invert max-w-none text-sm leading-relaxed">
                            {renderMarkdown(aiOutput)}
                        </div>
                    </div>
                )}
                
                {!aiOutput && !loading && (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-600 border-2 border-dashed border-slate-800 rounded-xl">
                        <Settings size={48} className="mb-4 opacity-20" />
                        <p>Select an AI action above to analyze this race.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default StrategyView;