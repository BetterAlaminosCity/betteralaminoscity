import {
  AlertTriangle,
  Building2,
  Coins,
  FileText,
  Gavel,
  GraduationCap,
  HandHeart,
  HardHat,
  HeartPulse,
  Home,
  Landmark,
  Leaf,
  Store,
  Trash2,
  Wheat,
  type LucideIcon,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "agriculture-fisheries": Wheat,
  business: Store,
  "disaster-preparedness": AlertTriangle,
  education: GraduationCap,
  environment: Leaf,
  "garbage-waste-disposal": Trash2,
  "health-services": HeartPulse,
  "housing-land-use": Home,
  "infrastructure-public-works": HardHat,
  "social-welfare": HandHeart,
  "office-of-the-mayor": Landmark,
  "city-engineers-office": HardHat,
  "city-health-office": HeartPulse,
  "city-treasurers-office": Coins,
  "civil-registrars-office": FileText,
  "sangguniang-panlungsod": Gavel,
};

const DEFAULT_ICON: LucideIcon = Building2;

export function getCategoryIcon(slug: string): LucideIcon {
  return CATEGORY_ICONS[slug] ?? DEFAULT_ICON;
}
