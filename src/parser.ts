import { z } from "zod";
import type {
  HomeAssistantEntity,
  PlexMediaContentType,
  PlexParseFailure,
  PlexPlaybackState,
  PlexSession,
} from "./types";

const optionalString = z.preprocess((value) => {
  if (value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  return value;
}, z.string().min(1).optional());

const optionalNumber = z.preprocess((value) => {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }

  return value;
}, z.number().finite().optional());

const rawAttributesSchema = z.object({
  username: optionalString,
  friendly_name: optionalString,
  entity_picture: optionalString,
  media_content_type: optionalString,
  media_duration: optionalNumber,
  media_episode: optionalNumber,
  media_library_title: optionalString,
  media_position: optionalNumber,
  media_season: optionalNumber,
  media_series_title: optionalString,
  media_title: optionalString,
}).passthrough();

const rawEntitySchema = z.object({
  entity_id: z.string().min(1),
  state: z.string().min(1),
  attributes: rawAttributesSchema,
});

const withOptionalField = <T extends object, K extends string, V>(
  object: T,
  key: K,
  value: V | undefined,
): T & Partial<Record<K, V>> =>
  value === undefined ? object : { ...object, [key]: value };

const normalizePlaybackState = (state: string): PlexPlaybackState => {
  switch (state) {
    case "playing":
    case "paused":
    case "idle":
    case "off":
    case "unavailable":
      return state;
    default:
      return "unknown";
  }
};

const normalizeMediaContentType = (contentType?: string): PlexMediaContentType => {
  switch (contentType) {
    case "tvshow":
    case "movie":
      return contentType;
    default:
      return "unknown";
  }
};

const buildSession = (
  entity: z.infer<typeof rawEntitySchema>,
): PlexSession => {
  const { attributes } = entity;
  let session: PlexSession = {
    entityId: entity.entity_id,
    playbackState: normalizePlaybackState(entity.state),
    mediaContentType: normalizeMediaContentType(attributes.media_content_type),
    displayName: attributes.username ?? attributes.friendly_name ?? entity.entity_id,
  };

  session = withOptionalField(session, "friendlyName", attributes.friendly_name);
  session = withOptionalField(session, "username", attributes.username);
  session = withOptionalField(session, "entityPicture", attributes.entity_picture);
  session = withOptionalField(session, "mediaTitle", attributes.media_title);
  session = withOptionalField(session, "mediaSeriesTitle", attributes.media_series_title);
  session = withOptionalField(session, "mediaLibraryTitle", attributes.media_library_title);
  session = withOptionalField(session, "mediaPosition", attributes.media_position);
  session = withOptionalField(session, "mediaDuration", attributes.media_duration);
  session = withOptionalField(session, "mediaSeason", attributes.media_season);
  session = withOptionalField(session, "mediaEpisode", attributes.media_episode);

  return session;
};

export const parsePlexSession = (entity: HomeAssistantEntity): PlexSession | undefined => {
  const result = rawEntitySchema.safeParse(entity);

  if (!result.success) {
    return undefined;
  }

  return buildSession(result.data);
};

export const parsePlexSessionFailure = (
  entity: HomeAssistantEntity,
): PlexParseFailure | undefined => {
  const result = rawEntitySchema.safeParse(entity);

  if (result.success) {
    return undefined;
  }

  const firstIssue = result.error.issues[0];
  const reason = firstIssue
    ? `${firstIssue.path.join(".") || "entity"}: ${firstIssue.message}`
    : "Unknown parse error";

  return {
    entityId: entity.entity_id,
    reason,
    entity,
  };
};
