import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  getConfiguredEntities,
  getDisplayName,
  getEntityPicture,
  getStateIcon,
  getSecondaryText,
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

    .secondary {
      color: var(--secondary-text-color, #666);
      font-size: 0.9rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
      display_mode: "compact",
      show_inactive: false,
      show_media_title: false,
      show_client_name: false,
      show_entity_picture: false,
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
    const secondary = getSecondaryText(entity, this.config ?? { type: "custom:plex-server-sessions" });
    const picture = this.config?.show_entity_picture ? getEntityPicture(entity) : undefined;
    const initials = getDisplayName(entity).slice(0, 1).toUpperCase();
    const artworkClass = this.config?.display_mode === "detailed" ? "artwork detailed" : "artwork";

    return html`
      <div class="tile">
        <div class="top">
          ${this.config?.show_entity_picture
            ? html`
                <div class=${artworkClass}>
                  ${picture
                    ? html`<img src=${picture} alt=${`${getDisplayName(entity)} artwork`} />`
                    : html`${initials}`}
                </div>
              `
            : nothing}
          <div class="content">
            <div class="row">
              <div class="name">${getDisplayName(entity)}</div>
              <div class="state">
                <ha-icon class="state-icon" .icon=${getStateIcon(entity.state)}></ha-icon>
              </div>
            </div>
            ${this.config?.display_mode === "detailed" && secondary
              ? html`<div class="secondary">${secondary}</div>`
              : nothing}
          </div>
        </div>
      </div>
    `;
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
