import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  mdiAlertCircleOutline,
  mdiChevronRight,
  mdiHelpCircleOutline,
  mdiLanDisconnect,
  mdiClose,
  mdiPause,
  mdiPlay,
  mdiPower,
  mdiSheep,
  mdiSleep,
  mdiStop,
} from "@mdi/js";
import "../src/plex-sessions-card";
import {
  getDetailedMedia,
  getDisplayName,
  getEntityPicture,
  getPlaybackStateMeta,
} from "../src/helpers";
import { parsePlexSession } from "../src/parser";
import type { HomeAssistant, HomeAssistantEntity, PlexSessionsCardConfig } from "../src/types";

class HaCardMock extends HTMLElement {}

class HaIconMock extends HTMLElement {
  private _icon = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  public set icon(value: string) {
    this._icon = value;
    this.setAttribute("data-icon", value);
    this.render();
  }

  public get icon(): string {
    return this._icon;
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["icon"];
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    if (name === "icon" && newValue) {
      this._icon = newValue;
      this.render();
    }
  }

  private render() {
    const icon = this._icon || this.getAttribute("icon") || "";
    const path = iconToPath(icon);

    if (!this.shadowRoot) {
      return;
    }

    this.shadowRoot.innerHTML = path
      ? `
          <style>
            :host {
              display: inline-flex;
              width: var(--mdc-icon-size, 24px);
              height: var(--mdc-icon-size, 24px);
              line-height: 1;
              color: inherit;
            }

            svg {
              width: 100%;
              height: 100%;
              fill: currentColor;
            }
          </style>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"></path></svg>
        `
      : "";
  }
}

if (!customElements.get("ha-card")) {
  customElements.define("ha-card", HaCardMock);
}

if (!customElements.get("ha-icon")) {
  customElements.define("ha-icon", HaIconMock);
}

const iconToPath = (icon: string): string => {
  switch (icon) {
    case "mdi:play":
      return mdiPlay;
    case "mdi:alert-circle-outline":
      return mdiAlertCircleOutline;
    case "mdi:pause":
      return mdiPause;
    case "mdi:stop":
      return mdiStop;
    case "mdi:power":
      return mdiPower;
    case "mdi:lan-disconnect":
      return mdiLanDisconnect;
    case "mdi:help-circle-outline":
      return mdiHelpCircleOutline;
    case "mdi:close":
      return mdiClose;
    case "mdi:chevron-right":
      return mdiChevronRight;
    case "mdi:sheep":
      return mdiSheep;
    case "mdi:sleep":
      return mdiSleep;
    default:
      return "";
  }
};

const episodeEntity: HomeAssistantEntity = {
  entity_id: "media_player.plex_client_service_plex_plex_web_firefox_windows",
  state: "paused",
  attributes: {
    media_content_type: "tvshow",
    media_duration: 1420,
    media_position: 209,
    media_title: "A Resident of the Village",
    media_series_title: "An Adventurer's Daily Grind at Age 29",
    media_season: 1,
    media_episode: 8,
    media_library_title: "TV Shows",
    username: "kzorro",
    entity_picture:
      "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?auto=format&fit=crop&w=300&q=80",
    friendly_name: "Plex Client Service Plex (Plex Web - Firefox - Windows)",
  },
};

const movieEntity: HomeAssistantEntity = {
  entity_id: "media_player.plex_plex_for_android_tv_google_tv_streamer",
  state: "playing",
  attributes: {
    media_content_type: "movie",
    media_duration: 10822,
    media_position: 7232,
    media_title: "Oppenheimer (2023)",
    media_library_title: "Movies",
    username: "kzorro",
    entity_picture:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=300&q=80",
    friendly_name: "Plex (Plex for Android (TV) - Google TV Streamer)",
  },
};

const idleEntity: HomeAssistantEntity = {
  entity_id: "media_player.plex_idle_living_room",
  state: "idle",
  attributes: {
    media_content_type: "movie",
    username: "alex",
    friendly_name: "Plex (Living Room TV)",
  },
};

const unavailableEntity: HomeAssistantEntity = {
  entity_id: "media_player.plex_bedroom_tv",
  state: "unavailable",
  attributes: {
    media_content_type: "movie",
    username: "sam",
    friendly_name: "Plex (Bedroom TV)",
  },
};

const malformedEntity: HomeAssistantEntity = {
  entity_id: "media_player.plex_broken_client",
  state: "playing",
  attributes: {
    media_content_type: "movie",
    media_duration: "1420",
    media_title: 123,
    friendly_name: "Broken Plex Client",
  },
};

const makeHass = (entities: HomeAssistantEntity[]): HomeAssistant => ({
  states: Object.fromEntries(entities.map((entity) => [entity.entity_id, entity])),
});

const fixtures: Array<{
  id: string;
  label: string;
  hass: HomeAssistant;
  config: PlexSessionsCardConfig;
}> = [
  {
    id: "mixed-active",
    label: "Mixed active sessions",
    hass: makeHass([episodeEntity, movieEntity]),
    config: {
      type: "custom:plex-server-sessions",
      title: "Plex",
    },
  },
  {
    id: "idle",
    label: "Nobody is watching",
    hass: makeHass([idleEntity, unavailableEntity]),
    config: {
      type: "custom:plex-server-sessions",
      title: "Plex",
    },
  },
  {
    id: "all-clients",
    label: "Show inactive clients",
    hass: makeHass([episodeEntity, movieEntity, idleEntity, unavailableEntity]),
    config: {
      type: "custom:plex-server-sessions",
      title: "Plex",
      show_inactive: true,
    },
  },
  {
    id: "parse-failure",
    label: "Parse failure",
    hass: makeHass([episodeEntity, malformedEntity]),
    config: {
      type: "custom:plex-server-sessions",
      title: "Plex",
      show_inactive: true,
    },
  },
  {
    id: "explicit",
    label: "Explicit entities",
    hass: makeHass([episodeEntity, movieEntity, idleEntity]),
    config: {
      type: "custom:plex-server-sessions",
      title: "Plex",
      entities: [movieEntity.entity_id],
    },
  },
];

@customElement("preview-app")
class PreviewApp extends LitElement {
  @state() private fixtureId = fixtures[0]?.id ?? "";
  @state() private selectedEntityId: string | null = null;

  static override styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background:
        radial-gradient(circle at top, rgba(255, 255, 255, 0.9), rgba(245, 242, 235, 0.95)),
        linear-gradient(180deg, #efe9df 0%, #e4ddd0 100%);
      color: #1d252c;
      font-family: "IBM Plex Sans", "Segoe UI", sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    main {
      width: min(1240px, calc(100vw - 32px));
      margin: 0 auto;
      padding: 32px 0 48px;
      display: grid;
      gap: 24px;
    }

    .hero {
      display: grid;
      gap: 10px;
    }

    .eyebrow {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: #6f7b86;
      font-weight: 700;
    }

    h1 {
      margin: 0;
      font-size: clamp(2rem, 5vw, 3.2rem);
      line-height: 0.95;
      letter-spacing: -0.04em;
    }

    .summary {
      max-width: 60ch;
      color: #55616c;
      margin: 0;
      font-size: 1rem;
      line-height: 1.5;
    }

    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    button {
      border: 0;
      border-radius: 999px;
      padding: 10px 14px;
      background: rgba(29, 37, 44, 0.08);
      color: #24303a;
      font: inherit;
      cursor: pointer;
      transition: background 120ms ease, color 120ms ease, transform 120ms ease;
    }

    button:hover {
      background: rgba(29, 37, 44, 0.14);
      transform: translateY(-1px);
    }

    button.active {
      background: #24303a;
      color: #f8f5ef;
    }

    .workspace {
      display: grid;
      gap: 16px;
      grid-template-columns: minmax(320px, 380px) minmax(0, 1fr);
      align-items: start;
    }

    .preview-column {
      display: grid;
      gap: 16px;
      min-width: 0;
    }

    .panel,
    .preview-shell,
    .detail-shell {
      background: rgba(255, 255, 255, 0.72);
      border: 1px solid rgba(36, 48, 58, 0.08);
      border-radius: 24px;
      box-shadow: 0 24px 60px rgba(62, 53, 37, 0.08);
      backdrop-filter: blur(10px);
    }

    .panel {
      padding: 18px;
      display: grid;
      gap: 12px;
    }

    .panel h2 {
      margin: 0;
      font-size: 0.9rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #6f7b86;
    }

    pre {
      margin: 0;
      padding: 14px;
      overflow: auto;
      border-radius: 16px;
      background: #1f252b;
      color: #edf2f7;
      font-size: 0.8rem;
      line-height: 1.45;
    }

    .preview-shell {
      padding: 20px;
      min-height: 420px;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.85), rgba(249, 246, 240, 0.92)),
        #ffffff;
    }

    .dashboard {
      width: 100%;
    }

    .detail-shell {
      padding: 18px;
      display: grid;
      gap: 14px;
      align-self: stretch;
    }

    .detail-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .detail-title {
      margin: 0;
      font-size: 0.9rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #6f7b86;
    }

    .close-button {
      width: 36px;
      height: 36px;
      padding: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 999px;
    }

    .detail-card {
      display: grid;
      gap: 14px;
    }

    .detail-hero {
      display: grid;
      grid-template-columns: 88px minmax(0, 1fr);
      gap: 14px;
      align-items: start;
    }

    .detail-art {
      width: 88px;
      height: 88px;
      border-radius: 18px;
      overflow: hidden;
      background: linear-gradient(135deg, #2f3640 0%, #66707a 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.9);
      font-weight: 700;
      font-size: 1.4rem;
    }

    .detail-art img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }

    .detail-meta {
      display: grid;
      gap: 6px;
      min-width: 0;
    }

    .detail-user {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      color: #54606b;
      font-size: 0.9rem;
    }

    .detail-user ha-icon {
      color: #54606b;
    }

    .detail-main-title {
      margin: 0;
      font-size: 1.2rem;
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

    .detail-subtitle,
    .detail-chip,
    .detail-entity {
      color: #5d6873;
      font-size: 0.92rem;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .detail-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .detail-chip {
      padding: 6px 10px;
      border-radius: 999px;
      background: rgba(29, 37, 44, 0.06);
    }

    .detail-progress {
      display: grid;
      gap: 6px;
    }

    .detail-progress-bar {
      height: 8px;
      border-radius: 999px;
      overflow: hidden;
      background: rgba(36, 48, 58, 0.1);
    }

    .detail-progress-fill {
      height: 100%;
      border-radius: inherit;
      background: #24303a;
    }

    .detail-progress-time {
      color: #5d6873;
      font-size: 0.85rem;
    }

    .empty-detail {
      color: #6f7b86;
      font-size: 0.95rem;
      line-height: 1.5;
    }

    ha-card {
      display: block;
      border-radius: 24px;
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid rgba(36, 48, 58, 0.08);
      box-shadow: 0 18px 40px rgba(62, 53, 37, 0.08);
    }

    @media (max-width: 840px) {
      .workspace {
        grid-template-columns: 1fr;
      }
    }
  `;

  private get activeFixture() {
    return fixtures.find((fixture) => fixture.id === this.fixtureId) ?? fixtures[0] ?? null;
  }

  private get selectedEntity(): HomeAssistantEntity | undefined {
    if (!this.selectedEntityId || !this.activeFixture) {
      return undefined;
    }

    return this.activeFixture.hass.states[this.selectedEntityId];
  }

  private get selectedSession() {
    return this.selectedEntity ? parsePlexSession(this.selectedEntity) : undefined;
  }

  override render() {
    const fixture = this.activeFixture;

    if (!fixture) {
      return nothing;
    }

    return html`
      <main>
        <section class="hero">
          <div class="eyebrow">Local Preview</div>
          <h1>Plex Server Sessions</h1>
          <p class="summary">
            Static fixture harness for iterating on the card without pushing a beta release
            into Home Assistant.
          </p>
        </section>

        <section class="controls">
          ${fixtures.map(
            (fixtureOption) => html`
              <button
                class=${fixtureOption.id === fixture.id ? "active" : ""}
                @click=${() => {
                  this.fixtureId = fixtureOption.id;
                }}
              >
                ${fixtureOption.label}
              </button>
            `,
          )}
        </section>

        <section class="workspace">
          <div class="panel">
            <h2>Card Config</h2>
            <pre>${JSON.stringify(fixture.config, null, 2)}</pre>
            <h2>Mock Entities</h2>
            <pre>${JSON.stringify(fixture.hass.states, null, 2)}</pre>
          </div>

          <div class="preview-column">
            <div class="preview-shell" @preview-select-entity=${this.handlePreviewSelectEntity}>
              <div class="dashboard">
                <preview-card
                  .hass=${fixture.hass}
                  .config=${fixture.config}
                ></preview-card>
              </div>
            </div>

            <div class="detail-shell">
              <div class="detail-header">
                <h2 class="detail-title">Preview Detail</h2>
                ${this.selectedEntity
                  ? html`
                      <button
                        class="close-button"
                        @click=${this.clearSelection}
                        aria-label="Close detail"
                      >
                        <ha-icon icon="mdi:close"></ha-icon>
                      </button>
                    `
                  : html``}
              </div>
              ${this.renderSelectedEntity()}
            </div>
          </div>
        </section>
      </main>
    `;
  }

  private renderSelectedEntity() {
    const entity = this.selectedEntity;
    const session = this.selectedSession;

    if (!entity || !session) {
      return html`
        <div class="empty-detail">
          Click a card tile to inspect the entity data and preview a lightweight detail view.
        </div>
      `;
    }

    const playbackState = getPlaybackStateMeta(session);
    const detailedMedia = getDetailedMedia(session);
    const picture = getEntityPicture(session);
    const initials = getDisplayName(session).slice(0, 1).toUpperCase();

    return html`
      <div class="detail-card">
        <div class="detail-hero">
          <div class="detail-art">
            ${picture
              ? html`<img src=${picture} alt=${`${getDisplayName(session)} artwork`} />`
              : html`${initials}`}
          </div>
          <div class="detail-meta">
            <div class="detail-user">
              <ha-icon .icon=${playbackState.icon}></ha-icon>
              <span>${getDisplayName(session)} · ${playbackState.label}</span>
            </div>
            <h3 class="detail-main-title">
              ${detailedMedia.primaryTitle ?? getDisplayName(session)}
            </h3>
            ${detailedMedia.secondaryTitle
              ? html`<div class="detail-subtitle">${detailedMedia.secondaryTitle}</div>`
              : nothing}
            <div class="detail-chips">
              ${detailedMedia.libraryTitle
                ? html`<div class="detail-chip">${detailedMedia.libraryTitle}</div>`
                : nothing}
            </div>
            <div class="detail-entity">
              ${session.friendlyName ?? entity.entity_id}
            </div>
          </div>
        </div>

        ${detailedMedia.progress
          ? html`
              <div class="detail-progress">
                <div class="detail-progress-bar">
                  <div
                    class="detail-progress-fill"
                    style=${`width: ${detailedMedia.progress.percent}%;`}
                  ></div>
                </div>
                <div class="detail-progress-time">
                  ${detailedMedia.progress.positionLabel} /
                  ${detailedMedia.progress.durationLabel}
                </div>
              </div>
            `
          : nothing}

        <div>
          <h2 class="detail-title">Attributes</h2>
          <pre>${JSON.stringify(entity.attributes, null, 2)}</pre>
        </div>
      </div>
    `;
  }

  private handlePreviewSelectEntity = (event: CustomEvent<{ entityId: string }>) => {
    this.selectedEntityId = event.detail.entityId;
  };

  private clearSelection = () => {
    this.selectedEntityId = null;
  };
}

@customElement("preview-card")
class PreviewCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: PlexSessionsCardConfig;

  override render() {
    return html`<plex-server-sessions></plex-server-sessions>`;
  }

  override firstUpdated() {
    this.syncCard();
  }

  override updated() {
    this.syncCard();
  }

  private syncCard() {
    const card = this.renderRoot.querySelector("plex-server-sessions") as
      | (HTMLElement & {
          setConfig?: (config: PlexSessionsCardConfig) => void;
          hass?: HomeAssistant;
        })
      | null;

    if (!card) {
      return;
    }

    card.removeEventListener("hass-more-info", this.handleMoreInfo as EventListener);
    card.setConfig?.(this.config);
    card.hass = this.hass;
    card.addEventListener("hass-more-info", this.handleMoreInfo as EventListener);
  }

  private handleMoreInfo = (event: CustomEvent<{ entityId: string }>) => {
    this.dispatchEvent(new CustomEvent("preview-select-entity", {
      detail: event.detail,
      bubbles: true,
      composed: true,
    }));
  };
}
