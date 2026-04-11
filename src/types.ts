export type PlexPlaybackState =
  | "playing"
  | "paused"
  | "idle"
  | "off"
  | "unavailable"
  | "unknown";

export type PlexSupportedMediaContentType =
  | "tvshow"
  | "movie";

export type PlexMediaContentType =
  | PlexSupportedMediaContentType
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
  libraryTitle?: string;
  progress?: PlexProgress;
}

export interface PlexEntityAttributes {
  username?: string;
  friendly_name?: string;
  entity_picture?: string;
  media_content_id?: number | string;
  media_content_type?: string;
  media_duration?: number;
  media_episode?: number;
  media_library_title?: string;
  media_position?: number;
  media_position_updated_at?: string;
  media_season?: number;
  media_series_title?: string;
  media_title?: string;
  player_source?: string;
}

export interface HomeAssistantEntity {
  entity_id: string;
  state: string;
  attributes: PlexEntityAttributes;
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
  max_columns?: number;
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
