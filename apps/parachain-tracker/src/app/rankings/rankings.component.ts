import { ChangeDetectionStrategy, Component } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { ProjectDto, ProjectStatus } from "@parachain-tracker/api-interfaces"

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
                <cdk-header-row
                    class="table-header"
                    *cdkHeaderRowDef="['rank', 'ticker', 'name', 'category', 'status']"
                ></cdk-header-row>
                <ng-container
                    *cdkRowDef="let item; columns: ['rank', 'ticker', 'name', 'category', 'status']"
                >
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
export class RankingsComponent {
    public rankings: { project: ProjectDto; ticker: any[] }[]

    public projectStatus = ProjectStatus

    constructor(route: ActivatedRoute) {
        route.data.subscribe(data => {
            this.rankings = data.rankings
        })
    }
}
