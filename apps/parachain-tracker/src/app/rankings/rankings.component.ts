import { ChangeDetectionStrategy, Component } from "@angular/core"
import { ProjectTile } from "@parachain-tracker/components"
import { ActivatedRoute } from "@angular/router"

@Component({
    selector: "pt-rankings",
    template: `
        <div class="frame">
            <h1 class="heading">Top Projects <span class="heading-annotation">(Last 24h)</span></h1>

            <cdk-table class="table" [dataSource]="rankings">
                <ng-container cdkColumnDef="rank">
                    <cdk-header-cell class="table-header-cell" *cdkHeaderCellDef
                        >Rank</cdk-header-cell
                    >
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
                        <img class="logo" src="/assets/projects/1/logo64@2x.png" alt="" />
                        <span class="name">{{ item.project.name }}</span>
                        <span class="tagline">{{ item.project.tagline }}</span>
                    </cdk-cell>
                </ng-container>

                <ng-container cdkColumnDef="category">
                    <cdk-header-cell class="table-header-cell" *cdkHeaderCellDef>
                        Category
                    </cdk-header-cell>
                    <cdk-cell class="table-cell" *cdkCellDef="let item">
                        <div class="pill" *ngIf="item.project.category">
                            <div class="pill-icon"></div>
                            <div class="pill-label">{{ item.project.category.name }}</div>
                        </div>
                    </cdk-cell>
                </ng-container>

                <!-- Header and Row Declarations -->
                <cdk-header-row
                    class="table-header"
                    *cdkHeaderRowDef="['rank', 'ticker', 'name', 'category']"
                ></cdk-header-row>
                <ng-container
                    *cdkRowDef="let item; columns: ['rank', 'ticker', 'name', 'category']"
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
    public rankings: { project: ProjectTile; ticker: any[] }[]

    constructor(route: ActivatedRoute) {
        route.data.subscribe(data => {
            console.log(data)
            this.rankings = data.rankings
        })
    }
}
