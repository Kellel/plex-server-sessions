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
      justify-content: start;
    }

    .tile {
      border: 1px solid var(--divider-color, #d9d9d9);
      border-radius: 12px;
      padding: 10px 12px 8px;
      display: grid;
      grid-template-rows: auto 1fr auto;
      gap: 6px;
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
      align-items: start;
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
      align-content: start;
      min-height: 72px;
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      min-width: 0;
    }

    .identity {
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 6px;
      overflow: hidden;
      white-space: nowrap;
    }

    .name {
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
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

    .library-trail {
      min-width: 0;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      color: var(--secondary-text-color, #666);
      font-size: 0.8rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex-shrink: 1;
    }

    .library-icon {
      --mdc-icon-size: 14px;
      flex-shrink: 0;
    }

    .progress {
      display: grid;
      gap: 3px;
      grid-column: 1 / -1;
      align-content: end;
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
      display: grid;
      gap: 10px;
      padding: 8px 0 4px;
      justify-items: center;
      text-align: center;
    }

    .empty.illustrated {
      padding: 12px 0 8px;
    }

    .empty-art {
      position: relative;
      width: 120px;
      height: 76px;
    }

    .empty-art ha-icon {
      position: absolute;
      color: var(--secondary-text-color, #666);
    }

    .empty-art .sheep-icon {
      --mdc-icon-size: 64px;
      left: 22px;
      top: 12px;
    }

    .empty-art .sleep-icon {
      --mdc-icon-size: 28px;
      color: color-mix(in srgb, var(--secondary-text-color, #666) 80%, white);
    }

    .empty-art .sleep-icon.one {
      right: 18px;
      top: 16px;
    }

    .empty-title {
      color: var(--primary-text-color, #111);
      font-size: 0.95rem;
      font-weight: 600;
    }

    .empty-body {
      color: var(--secondary-text-color, #666);
      font-size: 0.9rem;
      max-width: 28ch;
    }
  `;

  public setConfig(config: PlexSessionsCardConfig): void {
    if (!config.type) {
      throw new Error("Card type is required");
    }

    this.config = {
      show_inactive: false,
      max_columns: 4,
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
    const emptyState = this.getEmptyState();
    const gridStyle = this.getGridStyle();

    return html`
      <ha-card>
        <div class="header">${this.config.title ?? "Plex"}</div>
        ${entities.length > 0
          ? html`
              <div class="grid" style=${gridStyle}>
                ${entities.map((entity) => this.renderEntity(entity))}
              </div>
            `
          : this.renderEmptyState(emptyState)}
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

  private getGridStyle(): string {
    const maxColumns = Math.max(1, this.config?.max_columns ?? 4);
    const minTileWidth = 220;
    const gap = 8;
    const maxWidth = (maxColumns * minTileWidth) + ((maxColumns - 1) * gap);

    return `max-width: ${maxWidth}px;`;
  }

  private getEmptyState(): { title: string; body: string } {
    if (!this.hass || !this.config) {
      return {
        title: "No Plex sessions",
        body: "The card is waiting for Home Assistant state.",
      };
    }

    const configuredEntities = getConfiguredEntities(this.hass, this.config);

    if (configuredEntities.length === 0) {
      return {
        title: "No Plex clients found",
        body: "No matching Plex media players were discovered for this card.",
      };
    }

    if (this.config.show_inactive) {
      return {
        title: "No Plex sessions",
        body: "No Plex clients are currently available to display.",
      };
    }

    return {
      title: "Nobody is watching",
      body: "",
    };
  }

  private renderEmptyState(emptyState: { title: string; body: string }) {
    const illustrated = emptyState.title === "Nobody is watching";

    return html`
      <div class=${illustrated ? "empty illustrated" : "empty"}>
        ${illustrated
          ? html`
              <div class="empty-art" aria-hidden="true">
                <ha-icon class="sheep-icon" icon="mdi:sheep"></ha-icon>
                <ha-icon class="sleep-icon one" icon="mdi:sleep"></ha-icon>
              </div>
            `
          : nothing}
        <div class="empty-title">${emptyState.title}</div>
        ${emptyState.body
          ? html`<div class="empty-body">${emptyState.body}</div>`
          : nothing}
      </div>
    `;
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
              <div class="identity">
                <div class="name">${getDisplayName(entity)}</div>
                ${detailedMedia.libraryTitle
                  ? html`
                      <div class="library-trail">
                        <ha-icon class="library-icon" icon="mdi:chevron-right"></ha-icon>
                        <span>${detailedMedia.libraryTitle}</span>
                      </div>
                    `
                  : nothing}
              </div>
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
          </div>
        </div>
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
