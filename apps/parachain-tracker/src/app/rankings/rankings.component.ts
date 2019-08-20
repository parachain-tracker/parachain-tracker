import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { ProjectDto, ProjectStatus } from "@parachain-tracker/api-interfaces"
import { BreakpointObserver } from "@angular/cdk/layout"
import { Subscription } from "rxjs"

export const HANDSET = "(max-width: 668px)"
export const TABLET = "(max-width: 1002px)"
export const FRAME = "(max-width: 1336px)"

@Component({
    selector: "pt-rankings",
    template: `
        <div class="frame">
            <h1 class="heading">Top Projects <span class="heading-annotation">(Last 24h)</span></h1>

            <cdk-table class="table" [dataSource]="rankings">
                <ng-container cdkColumnDef="rank">
                    <cdk-header-cell class="table-header-cell" *cdkHeaderCellDef>#</cdk-header-cell>
                    <cdk-cell class="table-cell table-cell-rank" *cdkCellDef="let item">
                        {{ item.project.rank + 1 }}
                    </cdk-cell>
                </ng-container>

                <ng-container cdkColumnDef="ticker">
                    <cdk-header-cell class="table-header-cell" *cdkHeaderCellDef></cdk-header-cell>
                    <cdk-cell class="table-cell table-cell-ticker" *cdkCellDef="let item">
                        <pt-ticker class="ticker" [dataSeries]="item.ticker"></pt-ticker>
                    </cdk-cell>
                </ng-container>

                <ng-container cdkColumnDef="name">
                    <cdk-header-cell class="table-header-cell" *cdkHeaderCellDef
                        >Name</cdk-header-cell
                    >
                    <cdk-cell class="table-cell" *cdkCellDef="let item">
                        <img
                            class="logo"
                            src="/assets/projects/{{ item.project.id }}/logo64@2x.png"
                            alt=""
                        />
                        <span class="name">{{ item.project.name }}</span>
                        <span class="tagline">{{ item.project.tagline }}</span>
                    </cdk-cell>
                </ng-container>

                <ng-container cdkColumnDef="category">
                    <cdk-header-cell class="table-header-cell" *cdkHeaderCellDef>
                        Category
                    </cdk-header-cell>
                    <cdk-cell class="table-cell" *cdkCellDef="let item">
                        <pt-pill
                            class="pill"
                            *ngIf="item.project.category"
                            [label]="item.project.category.name"
                        ></pt-pill>
                    </cdk-cell>
                </ng-container>

                <ng-container cdkColumnDef="status">
                    <cdk-header-cell class="table-header-cell" *cdkHeaderCellDef
                        >Status</cdk-header-cell
                    >
                    <cdk-cell class="table-cell" *cdkCellDef="let item">{{
                        projectStatus[item.project.status]
                    }}</cdk-cell>
                </ng-container>

                <!-- Header and Row Declarations -->
                <cdk-header-row class="table-header" *cdkHeaderRowDef="columns"></cdk-header-row>
                <ng-container *cdkRowDef="let item; columns: columns">
                    <a class="table-body" [routerLink]="['/project', item.project.id]">
                        <cdk-row class="table-row"></cdk-row>
                    </a>
                </ng-container>
            </cdk-table>
        </div>
    `,
    styleUrls: ["./rankings.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RankingsComponent implements OnDestroy {
    public rankings: { project: ProjectDto; ticker: any[] }[]

    public projectStatus = ProjectStatus

    public sub = new Subscription()

    public columns: string[]

    constructor(route: ActivatedRoute, breakpoint: BreakpointObserver, cdr: ChangeDetectorRef) {
        this.sub.add(
            route.data.subscribe(data => {
                this.rankings = data.rankings
            }),
        )

        this.sub.add(
            breakpoint.observe([HANDSET, TABLET, FRAME]).subscribe(state => {
                if (state.breakpoints[HANDSET]) {
                    this.columns = ["rank", "name"]
                } else {
                    this.columns = ["rank", "ticker", "name", "category", "status"]
                }
                cdr.markForCheck()
            }),
        )
    }

    public ngOnDestroy() {
        this.sub.unsubscribe()
    }
}
