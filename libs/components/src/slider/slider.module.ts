import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { SliderComponent } from "./slider.component"
import { SlideComponent } from "./slide/slide.component"

@NgModule({
    declarations: [SliderComponent, SlideComponent],
    exports: [SliderComponent, SlideComponent],
    imports: [CommonModule],
})
export class SliderModule {}
