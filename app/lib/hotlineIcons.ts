import {
  AlertTriangle,
  Anchor,
  Building,
  Droplet,
  Flame,
  GraduationCap,
  HeartPulse,
  Phone,
  Radio,
  Scale,
  Search,
  ShieldAlert,
  Zap,
  type LucideIcon,
} from "lucide-react";

const HOTLINE_ICONS: Record<string, LucideIcon> = {
  "shield-alert": ShieldAlert,
  flame: Flame,
  "alert-triangle": AlertTriangle,
  "heart-pulse": HeartPulse,
  phone: Phone,
  radio: Radio,
  droplet: Droplet,
  anchor: Anchor,
  building: Building,
  "graduation-cap": GraduationCap,
  scale: Scale,
  search: Search,
  zap: Zap,
};

export function getHotlineIcon(icon: string | undefined): LucideIcon {
  return (icon && HOTLINE_ICONS[icon]) || Phone;
}
