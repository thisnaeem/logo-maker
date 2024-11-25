export interface LogoState {
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