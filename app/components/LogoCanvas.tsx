import * as Fi from 'react-icons/fi';
import * as Ai from 'react-icons/ai';
import * as Bs from 'react-icons/bs';
import * as Fa from 'react-icons/fa';
import * as Hi from 'react-icons/hi';
import { useRef, useEffect } from 'react';
import { DownloadOptions } from './DownloadOptions';

const iconSets = {
  fi: Fi,
  ai: Ai,
  bs: Bs,
  fa: Fa,
  hi: Hi
};

const iconComponents = {
  'fi-home': Fi.FiHome,
  'fi-star': Fi.FiStar,
  'fi-heart': Fi.FiHeart,
  'fi-settings': Fi.FiSettings,
  'fi-user': Fi.FiUser,
  'fi-mail': Fi.FiMail,
  'fi-phone': Fi.FiPhone,
  'fi-camera': Fi.FiCamera,
  'fi-music': Fi.FiMusic,
  'fi-cloud': Fi.FiCloud,
  'fi-coffee': Fi.FiCoffee,
  'fi-book': Fi.FiBook,
  'fi-pen': Fi.FiPenTool,
  'fi-globe': Fi.FiGlobe,
  'fi-bag': Fi.FiShoppingBag,

  'ai-home': Ai.AiOutlineHome,
  'ai-star': Ai.AiOutlineStar,
  'ai-heart': Ai.AiOutlineHeart,
  'ai-setting': Ai.AiOutlineSetting,
  'ai-user': Ai.AiOutlineUser,
  'ai-mail': Ai.AiOutlineMail,
  'ai-phone': Ai.AiOutlinePhone,
  'ai-camera': Ai.AiOutlineCamera,
  'ai-customer-service': Ai.AiOutlineCustomerService,
  'ai-cloud': Ai.AiOutlineCloud,

  'bs-house': Bs.BsHouse,
  'bs-star': Bs.BsStar,
  'bs-heart': Bs.BsHeart,
  'bs-gear': Bs.BsGear,
  'bs-person': Bs.BsPerson,
  'bs-envelope': Bs.BsEnvelope,
  'bs-telephone': Bs.BsTelephone,
  'bs-camera': Bs.BsCamera,
  'bs-music-note': Bs.BsMusicNote,
  'bs-cloud': Bs.BsCloud,

  'fa-home': Fa.FaHome,
  'fa-star': Fa.FaStar,
  'fa-heart': Fa.FaHeart,
  'fa-cog': Fa.FaCog,
  'fa-user': Fa.FaUser,
  'fa-envelope': Fa.FaEnvelope,
  'fa-phone': Fa.FaPhone,
  'fa-camera': Fa.FaCamera,
  'fa-music': Fa.FaMusic,
  'fa-cloud': Fa.FaCloud,

  'hi-home': Hi.HiHome,
  'hi-star': Hi.HiStar,
  'hi-heart': Hi.HiHeart,
  'hi-cog': Hi.HiCog,
  'hi-user': Hi.HiUser,
  'hi-mail': Hi.HiMail,
  'hi-phone': Hi.HiPhone,
  'hi-camera': Hi.HiCamera,
  'hi-music-note': Hi.HiMusicNote,
  'hi-cloud': Hi.HiCloud
};

interface LogoCanvasProps {
  logoState: {
    text: string;
    font: string;
    fontSize: number;
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
    fontWeight: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingLeft: number;
    gap: number;
  };
  setLogoState: (state: any) => void;
  canvasRef: React.RefObject<HTMLDivElement>;
}

export function LogoCanvas({ logoState, setLogoState, canvasRef }: LogoCanvasProps) {
  const getIconComponent = (iconId: string) => {
    return iconComponents[iconId] || null;
  };

  const IconComponent = getIconComponent(logoState.selectedIcon);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${logoState.font.replace(/ /g, '+')}`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, [logoState.font]);

  return (
    <div className="h-full flex flex-col">
      <div
        ref={canvasRef}
        className="flex-1 relative flex items-center justify-center"
        style={{
          background: 'repeating-conic-gradient(#80808020 0% 25%, transparent 0% 50%) 50% / 20px 20px'
        }}
      >
        <div
          className="relative"
          style={{
            padding: logoState.transparent ? '30px 20px' : 
              `${logoState.paddingTop}px ${logoState.paddingRight}px ${logoState.paddingBottom}px ${logoState.paddingLeft}px`,
            backgroundColor: logoState.transparent ? 'transparent' : logoState.backgroundColor,
            borderRadius: `${logoState.borderRadius}px`,
            display: 'inline-flex',
            flexDirection: logoState.stackingOption === 'top' || logoState.stackingOption === 'bottom' ? 'column' : 'row',
            alignItems: 'center',
            gap: `${logoState.gap}px`
          }}
        >
          {logoState.showBackground && (
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: logoState.backgroundFill,
                borderRadius: `${logoState.backgroundCornerRadius}px`,
                opacity: logoState.backgroundOpacity,
                zIndex: 0,
              }}
            />
          )}

          {(logoState.stackingOption === 'left' || logoState.stackingOption === 'top') && logoState.selectedIcon && (
            <div 
              style={{ 
                zIndex: 1, 
                position: 'relative',
                transform: `translate(${logoState.iconX}px, ${logoState.iconY}px)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }} 
              data-icon
            >
              {IconComponent && <IconComponent size={logoState.iconSize} color={logoState.iconColor} />}
            </div>
          )}

          <div 
            style={{ 
              zIndex: 1, 
              position: 'relative',
              transform: `translate(${logoState.textX}px, ${logoState.textY}px)`,
              fontFamily: logoState.font,
              fontSize: `${logoState.fontSize}px`,
              color: logoState.textColor,
              fontWeight: logoState.fontWeight
            }}
          >
            {logoState.text}
          </div>

          {(logoState.stackingOption === 'right' || logoState.stackingOption === 'bottom') && logoState.selectedIcon && (
            <div style={{ zIndex: 1, position: 'relative' }} data-icon>
              {IconComponent && <IconComponent size={logoState.iconSize} color={logoState.iconColor} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 