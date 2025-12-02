import React from 'react';
import { DOCUMENTATION_MARKDOWN } from '../constants';

const DocumentationView: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-8 bg-slate-950 text-slate-300">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-xl">
            <pre className="font-mono text-sm whitespace-pre-wrap leading-relaxed text-blue-100">
                {DOCUMENTATION_MARKDOWN}
            </pre>
        </div>
      </div>
    </div>
  );
};

export default DocumentationView;