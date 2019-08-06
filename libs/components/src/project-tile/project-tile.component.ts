import { ChangeDetectionStrategy, Component, Input } from "@angular/core"
import { ProjectTile } from "./interfaces"

@Component({
    selector: "pt-project-tile",
    template: `
        <div class="frame">
            <div class="rank rank--{{ feature.rank }}" *ngIf="feature.rank">
                <span class="rank-hash">#</span>
                <span class="rank-number" [innerText]="feature.rank"></span>
            </div>
            <div class="iconFrame">
                <img class="icon" [src]="feature.iconSrc" alt="" />
            </div>
            <h3 class="name" [innerHTML]="feature.name"></h3>
            <p class="tagline" [innerHTML]="feature.tagline"></p>
            <div class="category" *ngIf="feature.rank" [innerText]="feature.category"></div>
            <div class="users" *ngIf="feature.users >= 0">
                <i class="users-icon fas fa-eye"></i>
                <span class="users-count" [innerText]="feature.users | number"></span>
            </div>
        </div>
    `,
    styleUrls: ["./project-tile.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTileComponent {
    @Input()
    public feature: ProjectTile
}
