import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import {
    ExternalLinksDto,
    ProjectDto,
    ProjectStatus,
    TickerDto,
} from "@parachain-tracker/api-interfaces"
import { map, switchMap } from "rxjs/operators"
import { ApiService } from "../api/api.service"
import { Observable } from "rxjs"

@Component({
    selector: "pt-project",
    template: `
        <div class="frame" *ngIf="(project$ | async) as project">
            <div
                class="banner"
                style.background-image="url(/assets/projects/{{ project.id }}/banner.jpg)"
            >
                <pt-pill class="pill" *ngIf="project.network" [label]="project.network"></pt-pill>
                <pt-pill
                    class="pill"
                    *ngIf="project.category"
                    [label]="project.category.name"
                ></pt-pill>
                <pt-pill
                    class="pill"
                    *ngIf="project.status >= 0"
                    [label]="projectStatus[project.status]"
                    color="#0FC92D"
                ></pt-pill>
            </div>

            <div class="header">
                <p class="developer">
                    {{ project.developer }}
                </p>
                <div class="logo-frame">
                    <img
                        class="header-logo"
                        src="/assets/projects/{{ project.id }}/logo64@2x.png"
                        alt=""
                    />
                </div>
                <h1 class="name">{{ project.name }}</h1>
                <p class="tagline">{{ project.tagline }}</p>
                <a [href]="project.link" class="web-url">
                    <i class="web-url-icon fa fa-chevron-circle-right"></i>
                    <span class="web-url-label">Go to website</span>
                </a>
            </div>

            <div class="detail">
                <div class="social">
                    <ng-container *ngFor="let link of (externalLinks | async); let index = index">
                        <a class="social-link" *ngIf="link" [href]="link.url" target="_blank">
                            <ng-container
                                *ngIf="link.name === 'riot'; then riot; else social"
                            ></ng-container>
                            <ng-template #social>
                                <i class="social-icon {{ link.icon }}"></i>
                            </ng-template>
                            <ng-template #riot>
                                <svg
                                    class="social-icon riot"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1536"
                                    height="1792"
                                    viewBox="0 0 1536 1792"
                                    style="fill: currentColor"
                                >
                                    <path
                                        d="M40.467 163.152v1465.696H145.92V1664H0V128h145.92v35.152zm450.757 464.64v74.14h2.069c19.79-28.356 43.717-50.215 71.483-65.575 27.765-15.656 59.963-23.336 96-23.336 34.56 0 66.165 6.795 94.818 20.086 28.652 13.293 50.216 37.22 65.28 70.893 16.246-23.926 38.4-45.194 66.166-63.507 27.766-18.314 60.848-27.472 98.954-27.472 28.948 0 55.828 3.545 80.64 10.635 24.812 7.088 45.785 18.314 63.508 33.968 17.722 15.656 31.31 35.742 41.354 60.85 9.747 25.107 14.768 55.236 14.768 90.683v366.573h-150.35V865.28c0-18.314-.59-35.741-2.068-51.987-1.476-16.247-5.316-30.426-11.52-42.24-6.499-12.112-15.656-21.563-28.062-28.653-12.405-7.088-29.242-10.634-50.214-10.634-21.268 0-38.4 4.135-51.397 12.112-12.997 8.27-23.336 18.608-30.72 31.901-7.386 12.997-12.407 27.765-14.77 44.602-2.363 16.542-3.84 33.379-3.84 50.216v305.133H692.971v-307.2c0-16.247-.294-32.197-1.18-48.149-.591-15.95-3.84-30.424-9.157-44.011-5.317-13.293-14.178-24.223-26.585-32.197-12.406-7.976-30.425-12.112-54.646-12.112-7.088 0-16.542 1.478-28.062 4.726-11.52 3.25-23.04 9.157-33.968 18.02-10.93 8.86-20.383 21.563-28.063 38.103-7.68 16.543-11.52 38.4-11.52 65.28v317.834H349.44V627.792zm1004.309 1001.056V163.152H1390.08V128H1536v1536h-145.92v-35.152z"
                                    />
                                </svg>
                            </ng-template>
                        </a>
                    </ng-container>
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

                            <pt-ticker
                                class="stats-tile-ticker"
                                [dataSeries]="ticker.coords"
                            ></pt-ticker>

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
    public project$: Observable<ProjectDto>

    public projectStatus: typeof ProjectStatus

    public tickers$: Observable<TickerDto[]>

    public externalLinkIcons = {
        riot: "riot",
        reddit: "fab fa-reddit",
        twitter: "fab fa-twitter",
        medium: "fab fa-medium-m",
        telegram: "fab fa-telegram",
    }

    public externalLinks: Observable<(ExternalLinksDto & { icon: string })[]>

    constructor(route: ActivatedRoute, cdr: ChangeDetectorRef, api: ApiService) {
        this.project$ = route.data.pipe(map(data => data.project))

        this.tickers$ = route.data.pipe(
            switchMap(data => api.getTickers(data.project.id)),
            map(result => result.items),
        )

        this.externalLinks = this.project$.pipe(
            map(project =>
                project.externalLinks
                    .filter(link => this.externalLinkIcons[link.name])
                    .map(link => ({
                        ...link,
                        icon: this.externalLinkIcons[link.name],
                    })),
            ),
        )

        this.projectStatus = ProjectStatus
    }
}
