import { ColorPicker } from './ColorPicker';
import { useState } from 'react';
import { LogoState } from '../types/LogoState';

interface BackgroundControlsProps {
  logoState: Pick<LogoState, 'backgroundFill' | 'borderRadius' | 'transparent' | 
    'paddingTop' | 'paddingRight' | 'paddingBottom' | 'paddingLeft'>;
  setLogoState: (state: Partial<LogoState>) => void;
}

export function BackgroundControls({ logoState, setLogoState }: BackgroundControlsProps) {
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-2 text-white">Background</label>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={!logoState.transparent}
            onChange={(e) => setLogoState({ ...logoState, transparent: !e.target.checked })}
            className="mr-2"
          />
          <span className="text-white">Show Background</span>
        </div>
        
        {!logoState.transparent && (
          <>
            <ColorPicker
              color={logoState.backgroundFill}
              onChange={(color) => setLogoState({ ...logoState, backgroundFill: color })}
              showPicker={showBackgroundColorPicker}
              onToggle={() => setShowBackgroundColorPicker(!showBackgroundColorPicker)}
            />
          </>
        )}
      </div>

      <div>
        <label className="block mb-2 text-white">Corner Radius</label>
        <input
          type="range"
          min="0"
          max="300"
          value={logoState.borderRadius}
          onChange={(e) => setLogoState({ ...logoState, borderRadius: Number(e.target.value) })}
          className="w-full accent-blue-500"
        />
      </div>

      {!logoState.transparent && (
        <>
          <div className="mt-4">
            <label className="block mb-2 text-white">Padding</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block mb-1 text-sm text-gray-300">Top</label>
                <input
                  type="number"
                  value={logoState.paddingTop}
                  onChange={(e) => setLogoState({ ...logoState, paddingTop: Number(e.target.value) })}
                  className="w-full p-2 border bg-gray-700 text-white border-gray-600"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-300">Right</label>
                <input
                  type="number"
                  value={logoState.paddingRight}
                  onChange={(e) => setLogoState({ ...logoState, paddingRight: Number(e.target.value) })}
                  className="w-full p-2 border bg-gray-700 text-white border-gray-600"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-300">Bottom</label>
                <input
                  type="number"
                  value={logoState.paddingBottom}
                  onChange={(e) => setLogoState({ ...logoState, paddingBottom: Number(e.target.value) })}
                  className="w-full p-2 border bg-gray-700 text-white border-gray-600"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-300">Left</label>
                <input
                  type="number"
                  value={logoState.paddingLeft}
                  onChange={(e) => setLogoState({ ...logoState, paddingLeft: Number(e.target.value) })}
                  className="w-full p-2 border bg-gray-700 text-white border-gray-600"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 