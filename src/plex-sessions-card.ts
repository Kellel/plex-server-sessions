import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  getConfiguredEntities,
  getDetailedMedia,
  getDisplayName,
  getEntityPicture,
  getPlaybackStateMeta,
  isEntityActive,
} from "./helpers";
import type {
  HomeAssistant,
  HomeAssistantEntity,
  PlexSessionsCardConfig,
} from "./types";

@customElement("plex-server-sessions")
export class PlexSessionsCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private config?: PlexSessionsCardConfig;

  public static styles = css`
    :host {
      display: block;
    }

    ha-card {
      padding: 16px;
    }

    .header {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 12px;
    }

    .grid {
      display: grid;
      gap: 8px;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    }

    .tile {
      border: 1px solid var(--divider-color, #d9d9d9);
      border-radius: 12px;
      padding: 10px 12px;
      display: grid;
      gap: 8px;
      background: var(--card-background-color, #fff);
      cursor: pointer;
      transition: border-color 120ms ease, box-shadow 120ms ease;
    }

    .tile:hover,
    .tile:focus-visible {
      border-color: var(--primary-color, #03a9f4);
      box-shadow: 0 0 0 1px color-mix(in srgb, var(--primary-color, #03a9f4) 35%, transparent);
      outline: none;
    }

    .top {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: 10px;
      align-items: center;
    }

    .artwork {
      width: 42px;
      height: 42px;
      border-radius: 10px;
      overflow: hidden;
      background: linear-gradient(135deg, #2f3640 0%, #66707a 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.8rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .artwork.detailed {
      width: 52px;
      height: 52px;
      border-radius: 12px;
    }

    .artwork img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }

    .content {
      min-width: 0;
      display: grid;
      gap: 4px;
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      min-width: 0;
    }

    .name {
      font-weight: 600;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .state {
      opacity: 0.8;
      color: var(--secondary-text-color, #666);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .state-icon {
      --mdc-icon-size: 18px;
    }

    .media-primary {
      font-size: 0.95rem;
      font-weight: 600;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .media-secondary,
    .media-detail,
    .progress-time {
      color: var(--secondary-text-color, #666);
      font-size: 0.85rem;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .progress {
      display: grid;
      gap: 4px;
    }

    .progress-bar {
      height: 5px;
      border-radius: 999px;
      overflow: hidden;
      background: color-mix(in srgb, var(--primary-color, #03a9f4) 14%, transparent);
    }

    .progress-fill {
      height: 100%;
      border-radius: inherit;
      background: var(--primary-color, #03a9f4);
    }

    .empty {
      color: var(--secondary-text-color, #666);
      font-size: 0.95rem;
    }
  `;

  public setConfig(config: PlexSessionsCardConfig): void {
    if (!config.type) {
      throw new Error("Card type is required");
    }

    this.config = {
      show_inactive: false,
      ...config,
    };
  }

  public getCardSize(): number {
    return 2;
  }

  protected render() {
    if (!this.hass || !this.config) {
      return nothing;
    }

    const entities = this.getVisibleEntities();

    return html`
      <ha-card>
        <div class="header">${this.config.title ?? "Plex"}</div>
        ${entities.length > 0
          ? html`
              <div class="grid">
                ${entities.map((entity) => this.renderEntity(entity))}
              </div>
            `
          : html`<div class="empty">No Plex sessions found.</div>`}
      </ha-card>
    `;
  }

  private getVisibleEntities(): HomeAssistantEntity[] {
    if (!this.hass || !this.config) {
      return [];
    }

    const entities = getConfiguredEntities(this.hass, this.config).filter((entity) =>
      this.config?.show_inactive ? true : isEntityActive(entity),
    );

    return [...entities].sort((left, right) =>
      getDisplayName(left).localeCompare(getDisplayName(right)),
    );
  }

  private renderEntity(entity: HomeAssistantEntity) {
    const picture = getEntityPicture(entity);
    const initials = getDisplayName(entity).slice(0, 1).toUpperCase();
    const playbackState = getPlaybackStateMeta(entity);
    const detailedMedia = getDetailedMedia(entity);

    return html`
      <div
        class="tile"
        role="button"
        tabindex="0"
        @click=${() => this.showMoreInfo(entity.entity_id)}
        @keydown=${(event: KeyboardEvent) => this.handleTileKeydown(event, entity.entity_id)}
      >
        <div class="top">
          <div class="artwork detailed">
            ${picture
              ? html`<img src=${picture} alt=${`${getDisplayName(entity)} artwork`} />`
              : html`${initials}`}
          </div>
          <div class="content">
            <div class="row">
              <div class="name">${getDisplayName(entity)}</div>
              <div class="state" title=${playbackState.label}>
                <ha-icon
                  class="state-icon"
                  .icon=${playbackState.icon}
                  .label=${playbackState.label}
                ></ha-icon>
              </div>
            </div>
            ${detailedMedia.primaryTitle
              ? html`<div class="media-primary">${detailedMedia.primaryTitle}</div>`
              : nothing}
            ${detailedMedia.secondaryTitle
              ? html`<div class="media-secondary">${detailedMedia.secondaryTitle}</div>`
              : nothing}
            ${detailedMedia.detailLabel
              ? html`<div class="media-detail">${detailedMedia.detailLabel}</div>`
              : nothing}
            ${detailedMedia.progress
              ? html`
                  <div class="progress">
                    <div class="progress-bar">
                      <div
                        class="progress-fill"
                        style=${`width: ${detailedMedia.progress.percent}%;`}
                      ></div>
                    </div>
                    <div class="progress-time">
                      ${detailedMedia.progress.positionLabel} /
                      ${detailedMedia.progress.durationLabel}
                    </div>
                  </div>
                `
              : nothing}
          </div>
        </div>
      </div>
    `;
  }

  private handleTileKeydown(event: KeyboardEvent, entityId: string) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    this.showMoreInfo(entityId);
  }

  private showMoreInfo(entityId: string) {
    this.dispatchEvent(new CustomEvent("hass-more-info", {
      detail: { entityId },
      bubbles: true,
      composed: true,
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "plex-server-sessions": PlexSessionsCard;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "plex-server-sessions",
  name: "Plex Server Sessions",
  description: "Compact Lovelace card for Plex sessions.",
});
