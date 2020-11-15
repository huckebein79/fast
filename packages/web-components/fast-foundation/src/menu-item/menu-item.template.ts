import { html, ref, when } from "@microsoft/fast-element";
import { endTemplate, startTemplate } from "../patterns/start-end";
import { MenuItem, MenuItemRole } from "./menu-item";

/**
 * The template for the {@link @microsoft/fast-foundation#(MenuItem:class)} component.
 * @public
 */
export const MenuItemTemplate = html<MenuItem>`
    <template
        role="${x => x.role}"
        aria-checked="${x => (x.role !== MenuItemRole.menuitem ? x.checked : void 0)}"
        aria-disabled="${x => x.disabled}"
        aria-expanded="${x => x.expanded}"
        @keydown="${(x, c) => x.handleMenuItemKeyDown(c.event as KeyboardEvent)}"
        @click="${(x, c) => x.handleMenuItemClick(c.event as MouseEvent)}"
        class="${x => (x.disabled ? "disabled" : "")} ${x =>
            x.expanded ? "expanded" : ""}"
    >
        ${startTemplate}
        <span class="content" part="content">
            <slot></slot>
        </span>
        ${endTemplate}
        ${when(
            x => x.expanded,
            html<MenuItem>`
                <fast-anchored-region
                    anchor="${x => x}"
                    vertical-positioning-mode="dynamic"
                    horizontal-positioning-mode="dynamic"
                    vertical-inset="true"
                    ${ref("subMenuRegion")}
                >
                    <slot name="submenu"></slot>
                </fast-anchored-region>
            `
        )}
    </template>
`;
