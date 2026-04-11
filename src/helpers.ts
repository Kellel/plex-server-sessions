import { parsePlexSession, parsePlexSessionFailure } from "./parser";
import type {
  PlexConfiguredEntity,
  HomeAssistant,
  PlexDetailedMedia,
  PlexPlaybackStateMeta,
  PlexProgress,
  PlexSession,
  PlexSessionsCardConfig,
  PlexSupportedMediaContentType,
} from "./types";

const PLAYBACK_STATE_META: Record<PlexSession["playbackState"], PlexPlaybackStateMeta> = {
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

const assertNever = (value: never): never => {
  throw new Error(`Unhandled Plex media content type: ${String(value)}`);
};

const buildDetailedMedia = (fields: {
  primaryTitle: string | undefined;
  secondaryTitle: string | undefined;
  libraryTitle: string | undefined;
  progress: PlexProgress | undefined;
}): PlexDetailedMedia => {
  const detailedMedia: PlexDetailedMedia = {};

  if (fields.primaryTitle !== undefined) {
    detailedMedia.primaryTitle = fields.primaryTitle;
  }

  if (fields.secondaryTitle !== undefined) {
    detailedMedia.secondaryTitle = fields.secondaryTitle;
  }

  if (fields.libraryTitle !== undefined) {
    detailedMedia.libraryTitle = fields.libraryTitle;
  }

  if (fields.progress !== undefined) {
    detailedMedia.progress = fields.progress;
  }

  return detailedMedia;
};

export const getConfiguredEntities = (
  hass: HomeAssistant,
  config: PlexSessionsCardConfig,
): PlexConfiguredEntity[] => {
  const explicit = config.entities ?? [];

  const parseEntity = (entity: NonNullable<(typeof hass.states)[string]>): PlexConfiguredEntity => {
    const session = parsePlexSession(entity);

    if (session) {
      return {
        kind: "session",
        session,
      };
    }

    return {
      kind: "parse-failure",
      failure: parsePlexSessionFailure(entity) ?? {
        entityId: entity.entity_id,
        reason: "Unknown parse error",
        entity,
      },
    };
  };

  if (explicit.length > 0) {
    return explicit
      .map((entityId) => hass.states[entityId])
      .filter((entity): entity is NonNullable<typeof entity> => Boolean(entity))
      .map(parseEntity);
  }

  const matcher = new RegExp(`^${escapeRegex("media_player.plex_*").replace(/\\\*/g, ".*")}$`);

  return Object.values(hass.states)
    .filter(
      (entity) =>
        entity.entity_id.startsWith("media_player.") && matcher.test(entity.entity_id),
    )
    .map(parseEntity);
};

export const getPlaybackStateMeta = (
  entity: PlexSession,
): PlexPlaybackStateMeta => PLAYBACK_STATE_META[entity.playbackState];

export const isEntityActive = (entity: PlexSession): boolean =>
  getPlaybackStateMeta(entity).active;

export const getDisplayName = (entity: PlexSession): string => entity.displayName;

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

export const getProgress = (entity: PlexSession): PlexProgress | undefined => {
  const position = entity.mediaPosition;
  const duration = entity.mediaDuration;

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

const getTvShowEpisodeLabel = (entity: PlexSession): string | undefined => {
  const season = entity.mediaSeason;
  const episode = entity.mediaEpisode;

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

const getDetailedMediaForSupportedType = (
  entity: PlexSession,
  contentType: PlexSupportedMediaContentType,
): PlexDetailedMedia => {
  const mediaTitle = entity.mediaTitle;
  const libraryTitle = entity.mediaLibraryTitle;
  const friendlyName = entity.friendlyName;

  switch (contentType) {
    case "tvshow": {
      const seriesTitle = entity.mediaSeriesTitle;
      const episodeLabel = getTvShowEpisodeLabel(entity);

      return buildDetailedMedia({
        primaryTitle: mediaTitle,
        secondaryTitle: [seriesTitle, episodeLabel].filter(Boolean).join(" · ") || friendlyName,
        libraryTitle,
        progress: getProgress(entity),
      });
    }
    case "movie":
      return buildDetailedMedia({
        primaryTitle: mediaTitle,
        secondaryTitle: undefined,
        libraryTitle,
        progress: getProgress(entity),
      });
    default:
      return assertNever(contentType);
  }
};

export const getDetailedMedia = (entity: PlexSession): PlexDetailedMedia => {
  if (entity.mediaContentType !== "unknown") {
    return getDetailedMediaForSupportedType(entity, entity.mediaContentType);
  }

  return buildDetailedMedia({
    primaryTitle: entity.mediaTitle,
    secondaryTitle: entity.friendlyName,
    libraryTitle: entity.mediaLibraryTitle,
    progress: getProgress(entity),
  });
};

export const getEntityPicture = (entity: PlexSession): string | undefined => entity.entityPicture;
