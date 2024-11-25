import { useEffect, useState } from 'react';
import { ColorPicker } from './ColorPicker';

type LogoState = {
  text: string;
  font: string;
  fontSize: number;
  textX: number;
  textY: number;
  textColor: string;
  fontWeight: number;
};

interface TextControlsProps {
  logoState: LogoState;
  setLogoState: (state: Partial<LogoState>) => void;
}

const GOOGLE_FONTS = [
  'Plus Jakarta Sans',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Oswald',
  'Raleway',
  'Ubuntu',
  'Playfair Display',
  'Source Sans Pro'
];

const FONT_WEIGHTS = [400, 500, 600, 700];

export function TextControls({ logoState, setLogoState }: TextControlsProps) {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@${FONT_WEIGHTS.join(';')}&family=${GOOGLE_FONTS.slice(1).join('&family=').replace(/ /g, '+')}`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const [showTextColorPicker, setShowTextColorPicker] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-2 text-white">Text</label>
        <input
          type="text"
          value={logoState.text}
          onChange={(e) => setLogoState({ ...logoState, text: e.target.value })}
          className="w-full p-2 border bg-gray-700 text-white border-gray-600"
        />
      </div>
      
      <div>
        <label className="block mb-2 text-white">Font</label>
        <select
          value={logoState.font}
          onChange={(e) => setLogoState({ ...logoState, font: e.target.value })}
          className="w-full p-2 border bg-gray-700 text-white border-gray-600"
          style={{ fontFamily: logoState.font }}
        >
          {GOOGLE_FONTS.map(font => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 text-white">Font Weight</label>
        <select
          value={logoState.fontWeight}
          onChange={(e) => setLogoState({ ...logoState, fontWeight: Number(e.target.value) })}
          className="w-full p-2 border bg-gray-700 text-white border-gray-600"
        >
          {FONT_WEIGHTS.map(weight => (
            <option key={weight} value={weight}>
              {weight}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 text-white">Font Size</label>
        <input
          type="range"
          min="8"
          max="72"
          value={logoState.fontSize}
          onChange={(e) => setLogoState({ ...logoState, fontSize: Number(e.target.value) })}
          className="w-full accent-blue-500"
        />
      </div>

      <div>
        <label className="block mb-2 text-white">Position</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={logoState.textX}
            onChange={(e) => setLogoState({ ...logoState, textX: Number(e.target.value) })}
            className="w-1/2 p-2 border bg-gray-700 text-white border-gray-600"
            placeholder="X"
          />
          <input
            type="number"
            value={logoState.textY}
            onChange={(e) => setLogoState({ ...logoState, textY: Number(e.target.value) })}
            className="w-1/2 p-2 border bg-gray-700 text-white border-gray-600"
            placeholder="Y"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 text-white">Text Color</label>
        <ColorPicker
          color={logoState.textColor}
          onChange={(color) => setLogoState({ ...logoState, textColor: color })}
          showPicker={showTextColorPicker}
          onToggle={() => setShowTextColorPicker(!showTextColorPicker)}
        />
      </div>
    </div>
  );
} 