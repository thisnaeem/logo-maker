'use client';
import { useState, useEffect, useRef } from 'react';
import { GoogleFont, loadFonts } from 'google-fonts';
import { TextControls } from './TextControls';
import { TabSelector } from './TabSelector';
import { LogoCanvas } from './LogoCanvas';
import { StackingControls } from './StackingControls';
import { IconControls } from './IconControls';
import { BackgroundControls } from './BackgroundControls';
import { DownloadOptions } from './DownloadOptions';

interface LogoState {
  text: string;
  font: string;
  fontSize: number;
  fontWeight: number;
  textColor: string;
  textX: number;
  textY: number;
  selectedIcon: string;
  iconSize: number;
  iconX: number;
  iconY: number;
  stackingOption: 'left' | 'right' | 'top' | 'bottom';
  backgroundColor: string;
  borderRadius: number;
  showBackground: boolean;
  backgroundPadding: number;
  backgroundCornerRadius: number;
  backgroundOpacity: number;
  backgroundFill: string;
  iconColor: string;
  transparent: boolean;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  gap: number;
}

export default function LogoMaker() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'text' | 'icon' | 'stacking' | 'background'>('text');
  const [logoState, setLogoState] = useState<LogoState>({
    text: 'Your Logo',
    font: 'Plus Jakarta Sans',
    fontSize: 32,
    fontWeight: 400,
    textColor: '#000000',
    textX: 0,
    textY: 0,
    selectedIcon: 'fi-home',
    iconSize: 24,
    iconX: 0,
    iconY: 0,
    stackingOption: 'left',
    backgroundColor: '#ffffff',
    borderRadius: 0,
    showBackground: false,
    backgroundPadding: 10,
    backgroundCornerRadius: 0,
    backgroundOpacity: 1,
    backgroundFill: '#e5e5e5',
    iconColor: '#000000',
    transparent: false,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    gap: 10,
  });

  return (
    <div className="flex flex-col h-full">
      {/* Credits Bar */}
      <div className="bg-gray-900 text-white px-4 py-2 text-sm flex justify-between items-center">
        <div>
          Created by <a href="https://naeemanjum.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Naeem Anjum</a>
        </div>
        <div>
          <a href="https://naeemanjum.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            Need web development services? Visit naeemanjum.com
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Controls Panel */}
        <div className="w-1/3 bg-gray-800 overflow-y-auto custom-scrollbar h-full">
          <div className="p-4 pb-20 min-h-full">
            <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="mt-4">
              {activeTab === 'text' && <TextControls logoState={logoState} setLogoState={setLogoState} />}
              {activeTab === 'icon' && <IconControls logoState={logoState} setLogoState={setLogoState} />}
              {activeTab === 'stacking' && <StackingControls logoState={logoState} setLogoState={setLogoState} />}
              {activeTab === 'background' && <BackgroundControls logoState={logoState} setLogoState={setLogoState} />}
            </div>
          </div>
        </div>

        {/* Preview Canvas */}
        <div className="w-2/3 h-full bg-white">
          <div className="h-full">
            <div className="flex justify-between items-center mb-4 px-4">
              <h2 className="text-xl font-semibold">Logo Preview</h2>
              <DownloadOptions canvasRef={canvasRef} />
            </div>
            <div className="h-[calc(100%-60px)]">
              <LogoCanvas 
                logoState={logoState} 
                setLogoState={setLogoState} 
                canvasRef={canvasRef}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 