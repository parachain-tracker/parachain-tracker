import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    Input,
    OnInit,
    PLATFORM_ID,
} from "@angular/core"
import { ChartDataSets, ChartOptions, ChartType } from "chart.js"
import { Color, Label } from "ng2-charts"
import { isPlatformServer } from "@angular/common"

@Component({
    selector: "pt-ticker",
    template: `
        <canvas
            #canvas
            class="chart"
            baseChart
            [datasets]="lineChartData"
            [labels]="lineChartLabels"
            [options]="lineChartOptions"
            [colors]="lineChartColors"
            [legend]="lineChartLegend"
            [chartType]="lineChartType"
        ></canvas>
    `,
    styleUrls: ["./ticker.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TickerComponent implements OnInit {
    @Input()
    public dataSeries: { x: number; y: number }[]

    public lineChartData: ChartDataSets[]
    public lineChartLabels: Label[]
    public lineChartOptions: ChartOptions
    public lineChartColors: Color[]
    public lineChartLegend: boolean
    public lineChartType: ChartType

    constructor(cdr: ChangeDetectorRef, @Inject(PLATFORM_ID) platformId: object) {
        if (isPlatformServer(platformId)) {
            cdr.detach()
        }

        this.lineChartOptions = {
            responsive: true,
            animation: {
                duration: 0,
            },
            scales: {
                xAxes: [
                    {
                        display: false,
                        ticks: {
                            display: false,
                        },
                    },
                ],
                yAxes: [
                    {
                        display: false,
                        ticks: {},
                    },
                ],
            },
            elements: {
                point: {
                    radius: 0,
                },
            },
        }
        this.lineChartColors = [
            {
                borderColor: `#2d2f33`,
                borderWidth: 2,
            },
        ]
        this.lineChartLegend = false
        this.lineChartType = "line"
        this.lineChartLabels = []
    }

    public ngOnInit() {
        const { data, lineChartLabels } = this.dataSeries.reduce(
            (acc, curr) => {
                acc.lineChartLabels.push(curr.x)
                acc.data.push(curr.y)
                return acc
            },
            { data: [], lineChartLabels: [] },
        )

        this.lineChartData = [{ data, fill: false }]
        this.lineChartLabels = lineChartLabels
    }
}
