import { FiHome, FiStar, FiHeart, FiSettings, FiUser, FiMail, FiPhone, FiCamera, FiMusic, FiCloud, FiCoffee, FiBook, FiPenTool, FiGlobe, FiShoppingBag, FiTruck, FiMap, FiCalendar, FiPrinter, FiWifi, FiSun, FiMoon, FiUmbrella, FiCompass, FiAward, FiMoreHorizontal } from 'react-icons/fi';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { ColorPicker } from './ColorPicker';
import { IconModal } from './IconModal';

const reactIcons = [
  { id: 'fi-home', icon: <FiHome size={24} />, label: 'Home' },
  { id: 'fi-star', icon: <FiStar size={24} />, label: 'Star' },
  { id: 'fi-heart', icon: <FiHeart size={24} />, label: 'Heart' },
  { id: 'fi-settings', icon: <FiSettings size={24} />, label: 'Settings' },
  { id: 'fi-user', icon: <FiUser size={24} />, label: 'User' },
  { id: 'fi-mail', icon: <FiMail size={24} />, label: 'Mail' },
  { id: 'fi-phone', icon: <FiPhone size={24} />, label: 'Phone' },
  { id: 'fi-camera', icon: <FiCamera size={24} />, label: 'Camera' },
  { id: 'fi-music', icon: <FiMusic size={24} />, label: 'Music' },
  { id: 'fi-cloud', icon: <FiCloud size={24} />, label: 'Cloud' },
  { id: 'fi-coffee', icon: <FiCoffee size={24} />, label: 'Coffee' },
  { id: 'fi-book', icon: <FiBook size={24} />, label: 'Book' },
  { id: 'fi-pen', icon: <FiPenTool size={24} />, label: 'Pen' },
  { id: 'fi-globe', icon: <FiGlobe size={24} />, label: 'Globe' },
  { id: 'fi-bag', icon: <FiShoppingBag size={24} />, label: 'Bag' },
  { id: 'fi-truck', icon: <FiTruck size={24} />, label: 'Truck' },
  { id: 'fi-map', icon: <FiMap size={24} />, label: 'Map' },
  { id: 'fi-calendar', icon: <FiCalendar size={24} />, label: 'Calendar' },
  { id: 'fi-printer', icon: <FiPrinter size={24} />, label: 'Printer' },
  { id: 'fi-wifi', icon: <FiWifi size={24} />, label: 'Wifi' },
  { id: 'fi-sun', icon: <FiSun size={24} />, label: 'Sun' },
  { id: 'fi-moon', icon: <FiMoon size={24} />, label: 'Moon' },
  { id: 'fi-umbrella', icon: <FiUmbrella size={24} />, label: 'Umbrella' },
  { id: 'fi-compass', icon: <FiCompass size={24} />, label: 'Compass' },
  { id: 'fi-award', icon: <FiAward size={24} />, label: 'Award' }
];

interface IconControlsProps {
  logoState: {
    selectedIcon: string;
    iconSize: number;
    iconX: number;
    iconY: number;
    iconColor: string;
  };
  setLogoState: (state: any) => void;
}

export function IconControls({ logoState, setLogoState }: IconControlsProps) {
  const [iconSource, setIconSource] = useState<'upload' | 'library'>('library');
  const [uploadedIcons, setUploadedIcons] = useState<{ id: string; url: string }[]>([]);
  const [showIconColorPicker, setShowIconColorPicker] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'image/svg+xml') {
      const url = URL.createObjectURL(file);
      setUploadedIcons(prev => [...prev, { id: `upload-${Date.now()}`, url }]);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-2 text-white">Icon Source</label>
        <div className="flex gap-2 mb-4">
          <button
            className={`px-4 py-2  ${
              iconSource === 'library' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
            }`}
            onClick={() => setIconSource('library')}
          >
            Icon Library
          </button>
          <button
            className={`px-4 py-2  ${
              iconSource === 'upload' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
            }`}
            onClick={() => setIconSource('upload')}
          >
            Upload SVG
          </button>
        </div>

        {iconSource === 'upload' && (
          <input
            type="file"
            accept=".svg"
            onChange={handleIconUpload}
            className="mb-4 text-white"
          />
        )}

        <div>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {iconSource === 'library' ? (
              <>
                {reactIcons.slice(0, 19).map(({ id, icon, label }) => (
                  <button
                    key={id}
                    className={`p-2 flex flex-col items-center ${
                      logoState.selectedIcon === id ? 'bg-blue-500' : 'bg-gray-700'
                    }`}
                    onClick={() => setLogoState({ ...logoState, selectedIcon: id })}
                  >
                    {icon}
                    <span className="mt-1 text-xs text-white">{label}</span>
                  </button>
                ))}
                <button
                  className="p-2 flex flex-col items-center bg-gray-700 hover:bg-gray-600"
                  onClick={() => setIsModalOpen(true)}
                >
                  <FiMoreHorizontal size={24} />
                  <span className="mt-1 text-xs text-white">More Icons</span>
                </button>
              </>
            ) : (
              uploadedIcons.map(({ id, url }) => (
                <button
                  key={id}
                  className={`p-2 ${
                    logoState.selectedIcon === url ? 'bg-blue-500' : 'bg-gray-700'
                  }`}
                  onClick={() => setLogoState({ ...logoState, selectedIcon: url })}
                >
                  <img src={url} alt="Icon" className="w-6 h-6" />
                </button>
              ))
            )}
          </div>
          <IconModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSelect={(id) => setLogoState({ ...logoState, selectedIcon: id })}
            selectedIcon={logoState.selectedIcon}
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 text-white">Icon Size</label>
        <input
          type="range"
          min="16"
          max="128"
          value={logoState.iconSize}
          onChange={(e) => setLogoState({ ...logoState, iconSize: Number(e.target.value) })}
          className="w-full accent-blue-500"
        />
      </div>

      <div>
        <label className="block mb-2 text-white">Position</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={logoState.iconX}
            onChange={(e) => setLogoState({ ...logoState, iconX: Number(e.target.value) })}
            className="w-1/2 p-2 border  bg-gray-700 text-white border-gray-600"
            placeholder="X"
          />
          <input
            type="number"
            value={logoState.iconY}
            onChange={(e) => setLogoState({ ...logoState, iconY: Number(e.target.value) })}
            className="w-1/2 p-2 border  bg-gray-700 text-white border-gray-600"
            placeholder="Y"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 text-white">Icon Color</label>
        <ColorPicker
          color={logoState.iconColor}
          onChange={(color) => setLogoState({ ...logoState, iconColor: color })}
          showPicker={showIconColorPicker}
          onToggle={() => setShowIconColorPicker(!showIconColorPicker)}
        />
      </div>
    </div>
  );
} 