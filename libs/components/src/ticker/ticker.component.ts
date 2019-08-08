import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core"
import { ChartDataSets, ChartOptions, ChartType } from "chart.js"
import { Color, Label } from "ng2-charts"

@Component({
    selector: "pt-ticker",
    template: `
        <canvas
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
    public dataSeries: number[]

    @Input()
    public xAxisLabels: string[]

    public lineChartData: ChartDataSets[]
    public lineChartLabels: Label[]
    public lineChartOptions: ChartOptions
    public lineChartColors: Color[]
    public lineChartLegend: boolean
    public lineChartType: ChartType

    constructor() {
        this.lineChartOptions = {
            responsive: true,
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
        this.lineChartData = [{ data: this.dataSeries, fill: false }]
        this.lineChartLabels = this.xAxisLabels
    }
}
