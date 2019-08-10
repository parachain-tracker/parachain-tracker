import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { HomeComponent } from "./home.component"
import { RouterModule } from "@angular/router"
import { HeroComponent } from "./hero/hero.component"
import { FeaturedComponent } from "./featured/featured.component"
import { ProjectTileModule, SliderModule } from "@parachain-tracker/components"
import { TopItemsComponent } from "./top-items/top-items.component"

@NgModule({
    declarations: [HomeComponent, HeroComponent, FeaturedComponent, TopItemsComponent],
    exports: [HomeComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "",
                component: HomeComponent,
            },
        ]),
        SliderModule,
        ProjectTileModule,
    ],
})
export class HomeModule {}
