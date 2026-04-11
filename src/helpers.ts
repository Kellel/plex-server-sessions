import type {
  HomeAssistant,
  HomeAssistantEntity,
  PlexDetailedMedia,
  PlexMediaContentType,
  PlexPlaybackState,
  PlexPlaybackStateMeta,
  PlexProgress,
  PlexSessionsCardConfig,
} from "./types";

const PLAYBACK_STATE_META: Record<PlexPlaybackState, PlexPlaybackStateMeta> = {
  playing: {
    icon: "mdi:play",
    label: "Playing",
    active: true,
  },
  paused: {
    icon: "mdi:pause",
    label: "Paused",
    active: true,
  },
  idle: {
    icon: "mdi:stop",
    label: "Idle",
    active: false,
  },
  off: {
    icon: "mdi:power",
    label: "Off",
    active: false,
  },
  unavailable: {
    icon: "mdi:lan-disconnect",
    label: "Unavailable",
    active: false,
  },
  unknown: {
    icon: "mdi:help-circle-outline",
    label: "Unknown",
    active: false,
  },
};

const escapeRegex = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const getConfiguredEntities = (
  hass: HomeAssistant,
  config: PlexSessionsCardConfig,
): HomeAssistantEntity[] => {
  const explicit = config.entities ?? [];

  if (explicit.length > 0) {
    return explicit
      .map((entityId) => hass.states[entityId])
      .filter((entity): entity is HomeAssistantEntity => Boolean(entity));
  }

  const matcher = new RegExp(`^${escapeRegex("media_player.plex_*").replace(/\\\*/g, ".*")}$`);

  return Object.values(hass.states).filter(
    (entity) =>
      entity.entity_id.startsWith("media_player.") && matcher.test(entity.entity_id),
  );
};

export const getPlaybackState = (entity: HomeAssistantEntity): PlexPlaybackState => {
  switch (entity.state) {
    case "playing":
    case "paused":
    case "idle":
    case "off":
    case "unavailable":
      return entity.state;
    default:
      return "unknown";
  }
};

export const getPlaybackStateMeta = (
  entity: HomeAssistantEntity,
): PlexPlaybackStateMeta => PLAYBACK_STATE_META[getPlaybackState(entity)];

export const getMediaContentType = (
  entity: HomeAssistantEntity,
): PlexMediaContentType => {
  const contentType = getStringAttribute(entity, "media_content_type");

  switch (contentType) {
    case "tvshow":
    case "movie":
      return contentType;
    default:
      return "unknown";
  }
};

export const isEntityActive = (entity: HomeAssistantEntity): boolean =>
  getPlaybackStateMeta(entity).active;

export const getDisplayName = (entity: HomeAssistantEntity): string =>
  String(entity.attributes.username ?? entity.attributes.friendly_name ?? entity.entity_id);

const getNumberAttribute = (
  entity: HomeAssistantEntity,
  key: string,
): number | undefined => {
  const value = entity.attributes[key];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
};

const getStringAttribute = (
  entity: HomeAssistantEntity,
  key: string,
): string | undefined => {
  const value = entity.attributes[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
};

export const formatDuration = (value: number): string => {
  const totalSeconds = Math.max(0, Math.floor(value));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

export const getProgress = (entity: HomeAssistantEntity): PlexProgress | undefined => {
  const position = getNumberAttribute(entity, "media_position");
  const duration = getNumberAttribute(entity, "media_duration");

  if (position === undefined || duration === undefined || duration <= 0) {
    return undefined;
  }

  const percent = Math.min(100, Math.max(0, (position / duration) * 100));

  return {
    position,
    duration,
    percent,
    positionLabel: formatDuration(position),
    durationLabel: formatDuration(duration),
  };
};

export const getEpisodeLabel = (entity: HomeAssistantEntity): string | undefined => {
  const contentType = getMediaContentType(entity);

  if (contentType !== "tvshow") {
    return undefined;
  }

  const season = getNumberAttribute(entity, "media_season");
  const episode = getNumberAttribute(entity, "media_episode");

  if (season === undefined && episode === undefined) {
    return undefined;
  }

  if (season !== undefined && episode !== undefined) {
    return `S${season}E${episode}`;
  }

  if (episode !== undefined) {
    return `E${episode}`;
  }

  return `S${season}`;
};

export const getDetailedMedia = (entity: HomeAssistantEntity): PlexDetailedMedia => {
  const contentType = getMediaContentType(entity);
  const mediaTitle = getStringAttribute(entity, "media_title");
  const seriesTitle = getStringAttribute(entity, "media_series_title");
  const episodeLabel = getEpisodeLabel(entity);
  const libraryTitle = getStringAttribute(entity, "media_library_title");
  const friendlyName = getStringAttribute(entity, "friendly_name");
  const secondaryTitle =
    contentType === "tvshow"
      ? [seriesTitle, episodeLabel].filter(Boolean).join(" · ") || friendlyName
      : contentType === "movie"
        ? undefined
        : seriesTitle ?? friendlyName;

  return {
    primaryTitle: mediaTitle,
    secondaryTitle,
    detailLabel: contentType === "tvshow" ? undefined : episodeLabel,
    libraryTitle,
    progress: getProgress(entity),
  };
};

export const getEntityPicture = (entity: HomeAssistantEntity): string | undefined => {
  const picture = entity.attributes.entity_picture;

  if (typeof picture === "string" && picture.length > 0) {
    return picture;
  }

  return undefined;
};
