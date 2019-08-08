import { NgModule } from "@angular/core"
import { TickerComponent } from "./ticker.component"
import { ChartsModule } from "ng2-charts"

@NgModule({
    declarations: [TickerComponent],
    exports: [TickerComponent],
    imports: [ChartsModule],
})
export class TickerModule {}
