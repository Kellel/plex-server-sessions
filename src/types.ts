export type PlexPlaybackState =
  | "playing"
  | "paused"
  | "idle"
  | "off"
  | "unavailable"
  | "unknown";

export type PlexMediaContentType =
  | "tvshow"
  | "movie"
  | "music"
  | "episode"
  | "track"
  | "album"
  | "artist"
  | "playlist"
  | "video"
  | "unknown";

export interface PlexPlaybackStateMeta {
  icon: string;
  label: string;
  active: boolean;
}

export interface PlexProgress {
  position: number;
  duration: number;
  percent: number;
  positionLabel: string;
  durationLabel: string;
}

export interface PlexDetailedMedia {
  primaryTitle?: string;
  secondaryTitle?: string;
  detailLabel?: string;
  libraryTitle?: string;
  progress?: PlexProgress;
}

export interface HomeAssistantEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

export interface HomeAssistant {
  states: Record<string, HomeAssistantEntity>;
  callService?: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
  ) => void;
}

export interface PlexSessionsCardConfig {
  type: string;
  title?: string;
  entities?: string[];
  show_inactive?: boolean;
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
    }>;
  }
}
