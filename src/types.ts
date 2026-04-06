export type PlexDisplayMode = "compact" | "detailed";

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
  entity_patterns?: string[];
  show_inactive?: boolean;
  display_mode?: PlexDisplayMode;
  show_media_title?: boolean;
  show_client_name?: boolean;
  show_entity_picture?: boolean;
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
