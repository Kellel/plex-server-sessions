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

export interface PlexSession {
  entityId: string;
  playbackState: PlexPlaybackState;
  mediaContentType: PlexMediaContentType;
  displayName: string;
  friendlyName?: string;
  username?: string;
  entityPicture?: string;
  mediaTitle?: string;
  mediaSeriesTitle?: string;
  mediaLibraryTitle?: string;
  mediaPosition?: number;
  mediaDuration?: number;
  mediaSeason?: number;
  mediaEpisode?: number;
}

export interface PlexParseFailure {
  entityId: string;
  reason: string;
  entity: HomeAssistantEntity;
}

export type PlexConfiguredEntity =
  | {
      kind: "session";
      session: PlexSession;
    }
  | {
      kind: "parse-failure";
      failure: PlexParseFailure;
    };

export interface HomeAssistantEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

export interface HomeAssistant {
  states: Record<string, HomeAssistantEntity>;
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
