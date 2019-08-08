import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { ProjectDto, ProjectStatus, TickerDto } from "@parachain-tracker/api-interfaces"
import { map, switchMap } from "rxjs/operators"
import { ApiService } from "../api/api.service"
import { Observable } from "rxjs"

@Component({
    selector: "pt-project",
    template: `
        <div class="frame" *ngIf="(project$ | async) as project">
            <div class="banner" [style.background-image]="'url(/assets/projects/2/banner.jpg)'">
                <div class="pill" *ngIf="project.network">
                    <div class="pill-icon"></div>
                    <div class="pill-label">{{ project.network }}</div>
                </div>

                <div class="pill" *ngIf="project.category">
                    <div class="pill-icon"></div>
                    <div class="pill-label">{{ project.category.name }}</div>
                </div>

                <div class="pill" *ngIf="project.status >= 0">
                    <div class="pill-icon"></div>
                    <div class="pill-label">{{ projectStatus[project.status] }}</div>
                </div>
            </div>

            <div class="header">
                <p class="developer">
                    {{ project.developer }}
                </p>
                <div class="logo-frame">
                    <img class="header-logo" src="/assets/projects/2/logo64@2x.png" alt="" />
                </div>
                <h1 class="name">{{ project.name }}</h1>
                <p class="tagline">A virtual world that runs on open standards.</p>
                <a [href]="project.link" class="web-url">
                    <i class="web-url-icon fa fa-chevron-circle-right"></i>
                    <span class="web-url-label">Go to website</span>
                </a>
            </div>

            <div class="detail">
                <div class="social">
                    <a
                        class="social-link"
                        *ngFor="let link of project.externalLinks; let index = index"
                        [href]="link.url"
                        target="_blank"
                    >
                        <i class="social-icon {{ externalLinkIcons[index] }}"></i>
                    </a>
                </div>

                <div class="description">
                    <h2 class="section-heading">About</h2>

                    <div [innerHTML]="project.description"></div>
                </div>

                <div class="stats">
                    <h2 class="section-heading">Trends</h2>

                    <div class="stats-grid" *ngIf="(tickers$ | async) as tickers">
                        <div class="stats-tile" *ngFor="let ticker of tickers">
                            <span class="stats-tile-title">{{ ticker.name }}</span>
                            <div class="stats-tile-ticker"></div>

                            <div class="stats-tile-data">
                                <ng-container *ngFor="let trend of ticker.trends">
                                    <div class="stats-tile-key">{{ trend.label }}</div>
                                    <div class="stats-tile-value">{{ trend.value | number }}</div>
                                </ng-container>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ["./project.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent {
    public tiles = [1, 2, 3]

    public project$: Observable<ProjectDto>

    public projectStatus: typeof ProjectStatus

    public tickers$: Observable<TickerDto[]>

    public externalLinkIcons = [
        "fa fa-comments",
        "fab fa-reddit",
        "fab fa-twitter",
        "fab fa-medium-m",
        "fab fa-facebook",
    ]

    constructor(route: ActivatedRoute, cdr: ChangeDetectorRef, api: ApiService) {
        this.project$ = route.data.pipe(map(data => data.project))

        this.tickers$ = route.data.pipe(
            switchMap(data => api.getTickers(data.project.id)),
            map(result => result.items),
        )

        this.projectStatus = ProjectStatus
    }
}
