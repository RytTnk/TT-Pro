import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { MOCK_WEIGHT_HISTORY, MOCK_TRAINING_MENUS } from '../constants';
import { Plus, Calendar, TrendingDown } from 'lucide-react';

const FitnessView: React.FC = () => {
  const [menus, setMenus] = useState(MOCK_TRAINING_MENUS);

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">Fitness & Conditioning</h2>
        <p className="text-slate-400">Manage your physical baseline and training load.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">Current FTP</p>
              <h3 className="text-3xl font-bold text-white mt-1">265 <span className="text-sm text-slate-500 font-normal">W</span></h3>
            </div>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <TrendingDown size={20} className="transform rotate-180" />
            </div>
          </div>
          <p className="text-sm text-emerald-400">+5W from last month</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex justify-between items-start mb-4">
             <div>
              <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">Weight</p>
              <h3 className="text-3xl font-bold text-white mt-1">67.5 <span className="text-sm text-slate-500 font-normal">kg</span></h3>
             </div>
          </div>
          <p className="text-sm text-slate-400">3.92 W/kg</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
             <div>
              <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">Next Race</p>
              <h3 className="text-xl font-bold text-white mt-2">Mt. Fuji HC</h3>
              <p className="text-sm text-blue-400 mt-1">14 Days out</p>
             </div>
        </div>
      </div>

      {/* Weight Chart */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl h-[350px]">
        <h3 className="text-lg font-semibold text-white mb-6">Weight Progression (F-1-3)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_WEIGHT_HISTORY}>
            <defs>
              <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="date" stroke="#94a3b8" tick={{fontSize: 12}} />
            <YAxis stroke="#94a3b8" domain={['dataMin - 1', 'dataMax + 1']} tick={{fontSize: 12}} />
            <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                itemStyle={{ color: '#60a5fa' }}
            />
            <Area type="monotone" dataKey="weight" stroke="#3b82f6" fillOpacity={1} fill="url(#colorWeight)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Training Menu (F-1-1) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Training Library</h3>
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm transition-colors">
                <Plus size={16} />
                <span>New Workout</span>
            </button>
        </div>
        
        <div className="divide-y divide-slate-800">
            {menus.map(menu => (
                <div key={menu.id} className="p-6 hover:bg-slate-800/50 transition-colors group">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center space-x-3">
                                <h4 className="font-bold text-slate-200">{menu.title}</h4>
                                <span className={`text-xs px-2 py-0.5 rounded-full border ${
                                    menu.type === 'FTP' ? 'border-yellow-500/30 text-yellow-400' :
                                    menu.type === 'VO2Max' ? 'border-red-500/30 text-red-400' :
                                    'border-blue-500/30 text-blue-400'
                                }`}>{menu.type}</span>
                            </div>
                            <p className="text-sm text-slate-400 mt-1">{menu.description}</p>
                        </div>
                        <div className="flex items-center space-x-6 text-slate-500 text-sm">
                            <div className="text-right">
                                <span className="block font-mono text-slate-300">{menu.durationMin} min</span>
                                <span className="text-xs">Duration</span>
                            </div>
                            <div className="text-right">
                                <span className="block font-mono text-slate-300">{menu.tss}</span>
                                <span className="text-xs">TSS</span>
                            </div>
                            <button className="text-slate-600 hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Calendar size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FitnessView;