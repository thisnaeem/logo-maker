"use client";

import { useState, useRef, useEffect } from "react";
import { LogoCanvas } from "./LogoCanvas";
import { TextControls } from "./TextControls";
import { IconControls } from "./IconControls";
import { StackingControls } from "./StackingControls";
import { BackgroundControls } from "./BackgroundControls";
import { DownloadOptions } from "./DownloadOptions";
import { LogoState } from "../types/LogoState";
import { FiType, FiStar, FiLayers, FiSquare, FiHelpCircle } from "react-icons/fi";
import Joyride, { CallBackProps, STATUS, EVENTS } from 'react-joyride';

export default function LogoMaker() {
  const [activeTab, setActiveTab] = useState<
    "text" | "icon" | "stacking" | "background"
  >("text");
  const canvasRef = useRef<HTMLDivElement>(null);
  const [runTour, setRunTour] = useState(false);
  const [steps] = useState([
    {
      target: '.logo-maker-intro',
      content: 'Welcome to Logo Maker! Let me show you how to create your perfect logo.',
      placement: 'center' as const,
      disableBeacon: true,
    },
    {
      target: '[data-tour="text-tab"]',
      content: 'Start by customizing your text. Change the font, size, color and position.',
      placement: 'right' as const,
    },
    {
      target: '[data-tour="icon-tab"]',
      content: 'Add an icon to your logo and customize its appearance.',
      placement: 'right' as const,
    },
    {
      target: '[data-tour="layout-tab"]',
      content: 'Adjust how your text and icon are positioned relative to each other.',
      placement: 'right' as const,
    },
    {
      target: '[data-tour="bg-tab"]',
      content: 'Customize your background style, color, and corner radius.',
      placement: 'right' as const,
    },
    {
      target: '[data-tour="download-options"]',
      content: 'When you\'re done, download your logo in various formats!',
      placement: 'left' as const,
    },
  ]);

  useEffect(() => {
    // Check if user has seen the tour before
    const hasSeenTour = localStorage.getItem('hasSeenLogoMakerTour');
    if (!hasSeenTour) {
      setRunTour(true);
    }
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      localStorage.setItem('hasSeenLogoMakerTour', 'true');
      setRunTour(false);
    }

    // Handle tour closing
    if (type === EVENTS.TOUR_END) {
      setRunTour(false);
    }
  };

  const [logoState, setLogoState] = useState<LogoState>({
    text: "Your Logo",
    font: "Plus Jakarta Sans",
    fontSize: 24,
    fontWeight: 500,
    textColor: "#000000",
    textX: 0,
    textY: 0,
    selectedIcon: "fi-star",
    iconSize: 32,
    iconX: 0,
    iconY: 0,
    stackingOption: "left",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    showBackground: true,
    backgroundPadding: 16,
    backgroundCornerRadius: 8,
    backgroundOpacity: 1,
    backgroundFill: "#ffffff",
    iconColor: "#000000",
    transparent: false,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    gap: 12,
  });

  return (
    <>
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        showSkipButton
        showProgress
        disableOverlayClose
        floaterProps={{
          styles: {
            floater: {
              filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))',
            }
          }
        }}
        styles={{
          options: {
            arrowColor: '#1e293b',
            backgroundColor: '#1e293b',
            overlayColor: 'rgba(0, 0, 0, 0.65)',
            primaryColor: '#3b82f6',
            textColor: '#f3f4f6',
            width: 400,
            zIndex: 1000,
          },
          tooltip: {
            borderRadius: '12px',
            fontSize: '15px',
            padding: '20px',
          },
          tooltipContainer: {
            textAlign: 'left'
          },
          tooltipTitle: {
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '10px',
          },
          buttonNext: {
            backgroundColor: '#3b82f6',
            borderRadius: '8px',
            fontSize: '14px',
            padding: '8px 16px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
          },
          buttonBack: {
            color: '#94a3b8',
            fontSize: '14px',
            fontWeight: '500',
            marginRight: '12px',
          },
          buttonSkip: {
            color: '#94a3b8',
            fontSize: '14px',
            fontWeight: '500',
          },
          buttonClose: {
            display: 'none',
          }
        }}
        callback={handleJoyrideCallback}
      />
      
      <div className="flex h-full w-full">
        <div className="logo-maker-intro flex w-full">
          <div className="flex">
            {/* Primary Sidebar */}
            <div className="w-[80px] bg-gray-900 border-r border-gray-800">
              <div className="p-4">
                <h1 className="text-xl font-semibold text-white mb-6 truncate">Logo</h1>
                <nav className="flex flex-col space-y-2">
                  {[
                    { id: "text", icon: <FiType />, label: "Text", tourId: "text-tab" },
                    { id: "icon", icon: <FiStar />, label: "Icon", tourId: "icon-tab" },
                    { id: "stacking", icon: <FiLayers />, label: "Layout", tourId: "layout-tab" },
                    { id: "background", icon: <FiSquare />, label: "BG", tourId: "bg-tab" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      data-tour={item.tourId}
                      onClick={() => setActiveTab(item.id as typeof activeTab)}
                      className={`
                        group relative p-3 rounded-lg transition-all
                        ${
                          activeTab === item.id
                            ? "bg-blue-500 text-white"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        }
                      `}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-xl mb-1">{item.icon}</span>
                        <span className="text-xs font-medium">{item.label}</span>
                      </div>
                      {activeTab === item.id && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-l" />
                      )}
                      
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded 
                                    opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {item.label} Settings
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Secondary Sidebar */}
            <div className="w-[320px] bg-gray-800 p-6 overflow-y-auto">
              {activeTab === "text" && (
                <TextControls 
                  logoState={logoState} 
                  setLogoState={(updates) => setLogoState(prev => ({ ...prev, ...updates }))} 
                />
              )}
              {activeTab === "icon" && (
                <IconControls 
                  logoState={logoState} 
                  setLogoState={(updates) => setLogoState(prev => ({ ...prev, ...updates }))} 
                />
              )}
              {activeTab === "stacking" && (
                <StackingControls 
                  logoState={logoState} 
                  setLogoState={(updates) => setLogoState(prev => ({ ...prev, ...updates }))} 
                />
              )}
              {activeTab === "background" && (
                <BackgroundControls 
                  logoState={logoState} 
                  setLogoState={(updates) => setLogoState(prev => ({ ...prev, ...updates }))} 
                />
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col w-full">
            <div data-tour="download-options" className="bg-gray-900 p-4 flex justify-between items-center">
              <a 
                href="https://naeemanjum.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/50 
                         hover:bg-gray-800 transition-all duration-200"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-gray-400 group-hover:text-gray-300">Made by</span>
                  <span className="font-medium text-gray-200 group-hover:text-white">
                    Naeem Anjum
                  </span>
                </div>
                <svg 
                  className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transform group-hover:translate-x-0.5 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
              </a>
              <div className="flex space-x-3">
                <DownloadOptions canvasRef={canvasRef} />
                <button
                  onClick={() => setRunTour(true)}
                  className="text-gray-400 hover:text-white transition-colors"
                  title="Restart Tour"
                >
                  <FiHelpCircle size={20} />
                </button>
              </div>
            </div>
            <div className="flex-1 w-full">
              <LogoCanvas logoState={logoState} canvasRef={canvasRef} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
