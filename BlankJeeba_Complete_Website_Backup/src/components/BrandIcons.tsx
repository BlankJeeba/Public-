import {
  Bot,
  Camera,
  CloudSun,
  Compass,
  Eye,
  Film,
  Flame,
  GraduationCap,
  Layers,
  MapPin,
  PlaySquare,
  QrCode,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import type { PhilosophyItem, VisionIconKey } from '../content/site';

export function VisionIcon({
  iconKey,
  className = 'h-5 w-5',
}: {
  iconKey?: VisionIconKey;
  className?: string;
}) {
  switch (iconKey) {
    case 'youtube':
      return <PlaySquare className={className} />;
    case 'photo-download':
      return <Camera className={className} />;
    case 'ai-assistant':
      return <Bot className={className} />;
    case 'project-jeeba':
      return <Sparkles className={className} />;
    case 'project-dream':
      return <CloudSun className={className} />;
    case 'project-qr':
      return <QrCode className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}

export function PhilosophyIcon({
  iconKey,
  className = 'h-5 w-5',
}: {
  iconKey: PhilosophyItem['iconKey'];
  className?: string;
}) {
  switch (iconKey) {
    case 'compass':
      return <Compass className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'shield':
      return <ShieldCheck className={className} />;
    case 'flame':
      return <Flame className={className} />;
    case 'layers':
      return <Layers className={className} />;
    case 'eye':
      return <Eye className={className} />;
  }
}

export function BeyondAiIcon({
  itemKey,
  className = 'h-5 w-5',
}: {
  itemKey: string;
  className?: string;
}) {
  switch (itemKey) {
    case 'teaching':
      return <GraduationCap className={className} />;
    case 'photography':
      return <Camera className={className} />;
    case 'travel':
      return <MapPin className={className} />;
    case 'films':
      return <Film className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}
