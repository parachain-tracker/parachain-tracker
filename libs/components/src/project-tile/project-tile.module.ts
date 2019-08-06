import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ProjectTileComponent } from "./project-tile.component"

@NgModule({
    declarations: [ProjectTileComponent],
    exports: [ProjectTileComponent],
    imports: [CommonModule],
})
export class ProjectTileModule {}
