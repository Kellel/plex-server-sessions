import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  getConfiguredEntities,
  getDisplayName,
  getSecondaryText,
  getStateGlyph,
  isEntityActive,
} from "./helpers";
import type {
  HomeAssistant,
  HomeAssistantEntity,
  PlexSessionsCardConfig,
} from "./types";

@customElement("plex-sessions-card")
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
      gap: 4px;
      background: var(--card-background-color, #fff);
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .name {
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .state {
      font-family: monospace;
      opacity: 0.8;
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
      show_title: true,
      show_media_title: false,
      show_client_name: false,
      show_entity_picture: false,
      state_style: "symbol",
      sort_by: "username",
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
        ${this.config.show_title
          ? html`<div class="header">${this.config.title ?? "Plex"}</div>`
          : nothing}
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

    return [...entities].sort((left, right) => {
      switch (this.config?.sort_by) {
        case "state":
          return left.state.localeCompare(right.state);
        case "entity_id":
          return left.entity_id.localeCompare(right.entity_id);
        case "username":
        default:
          return getDisplayName(left).localeCompare(getDisplayName(right));
      }
    });
  }

  private renderEntity(entity: HomeAssistantEntity) {
    const secondary = getSecondaryText(entity, this.config ?? { type: "custom:plex-sessions-card" });

    return html`
      <div class="tile">
        <div class="row">
          <div class="name">${getDisplayName(entity)}</div>
          <div class="state">${getStateGlyph(entity.state)}</div>
        </div>
        ${this.config?.display_mode === "detailed" && secondary
          ? html`<div class="secondary">${secondary}</div>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "plex-sessions-card": PlexSessionsCard;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "plex-sessions-card",
  name: "Plex Sessions Card",
  description: "Compact Lovelace card for Plex sessions.",
});
