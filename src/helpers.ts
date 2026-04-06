import type {
  HomeAssistant,
  HomeAssistantEntity,
  PlexSessionsCardConfig,
} from "./types";

const DEFAULT_PATTERNS = ["media_player.plex_*", "media_player.plex_client_service_*"];

const escapeRegex = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const wildcardToRegex = (pattern: string): RegExp =>
  new RegExp(`^${escapeRegex(pattern).replace(/\\\*/g, ".*")}$`);

export const getConfiguredEntities = (
  hass: HomeAssistant,
  config: PlexSessionsCardConfig,
): HomeAssistantEntity[] => {
  const explicit = config.entities ?? [];
  const patterns = config.entity_patterns?.length
    ? config.entity_patterns
    : DEFAULT_PATTERNS;
  const matchers = patterns.map(wildcardToRegex);

  const discovered = Object.values(hass.states).filter((entity) => {
    if (!entity.entity_id.startsWith("media_player.")) {
      return false;
    }

    if (explicit.includes(entity.entity_id)) {
      return true;
    }

    return matchers.some((matcher) => matcher.test(entity.entity_id));
  });

  if (explicit.length === 0) {
    return discovered;
  }

  return explicit
    .map((entityId) => hass.states[entityId])
    .filter((entity): entity is HomeAssistantEntity => Boolean(entity));
};

export const isEntityActive = (entity: HomeAssistantEntity): boolean =>
  entity.state === "playing" || entity.state === "paused";

export const getDisplayName = (entity: HomeAssistantEntity): string =>
  String(entity.attributes.username ?? entity.attributes.friendly_name ?? entity.entity_id);

export const getSecondaryText = (
  entity: HomeAssistantEntity,
  config: PlexSessionsCardConfig,
): string | undefined => {
  if (config.show_media_title) {
    const series = entity.attributes.media_series_title;
    const title = entity.attributes.media_title;
    if (typeof series === "string" && typeof title === "string") {
      return `${series}: ${title}`;
    }
    if (typeof title === "string") {
      return title;
    }
  }

  if (config.show_client_name) {
    const clientName = entity.attributes.player_source ?? entity.attributes.friendly_name;
    if (typeof clientName === "string") {
      return clientName;
    }
  }

  return undefined;
};

export const getStateGlyph = (state: string): string => {
  switch (state) {
    case "playing":
      return ">";
    case "paused":
      return "||";
    case "idle":
      return "o";
    case "off":
      return "-";
    case "unavailable":
      return "x";
    default:
      return "?";
  }
};
