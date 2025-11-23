import React, { useState } from 'react';
import { MigrationItem } from '../types';

interface Props {
  item: MigrationItem;
}

const CheatSheetCard: React.FC<Props> = ({ item }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: 'unity' | 'godot') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-cardBg border border-gray-800 rounded-lg overflow-hidden shadow-lg hover:border-gray-600 transition-colors duration-300 flex flex-col h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-3 border-b border-gray-700 flex flex-wrap justify-between items-center gap-2">
        <h3 className="font-bold text-gray-200 text-base md:text-lg break-words mr-2">{item.title}</h3>
        <span className="text-[10px] uppercase font-mono text-gray-500 bg-gray-950 px-2 py-1 rounded border border-gray-700 whitespace-nowrap">
          {item.category}
        </span>
      </div>

      {/* Description / Pitfall */}
      {(item.description || item.pitfall) && (
        <div className="px-4 py-3 bg-gray-800/50 text-sm border-b border-gray-800">
          {item.description && <p className="text-gray-400 mb-2 leading-relaxed">{item.description}</p>}
          {item.pitfall && (
            <div className="flex items-start gap-2 text-red-300 bg-red-950/30 p-2 rounded border border-red-900/50 text-xs md:text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span><span className="font-bold">Warning:</span> {item.pitfall}</span>
            </div>
          )}
        </div>
      )}

      {/* Code Comparison */}
      <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-700">
        
        {/* Unity Side */}
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center bg-black/40 px-3 py-1.5 border-b border-gray-800">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Unity (C#)</span>
            <button 
              onClick={() => copyToClipboard(item.unityCode, 'unity')}
              className="text-[10px] text-gray-500 hover:text-white transition-colors"
            >
              {copied === 'unity' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="p-3 font-mono text-xs md:text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap bg-[#1e1e1e] flex-1 h-full">
             {item.unityCode}
          </div>
        </div>

        {/* Godot Side */}
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center bg-[#478cbf]/10 px-3 py-1.5 border-b border-gray-800">
            <span className="text-[10px] font-bold text-[#478cbf] uppercase tracking-wider">Godot (GDScript)</span>
            <button 
               onClick={() => copyToClipboard(item.godotCode, 'godot')}
               className="text-[10px] text-[#478cbf] hover:text-white transition-colors"
            >
              {copied === 'godot' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="p-3 font-mono text-xs md:text-sm text-blue-100 overflow-x-auto whitespace-pre-wrap bg-[#1a2630] flex-1 h-full">
             {item.godotCode}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheatSheetCard;