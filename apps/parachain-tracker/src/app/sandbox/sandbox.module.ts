import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { SandboxComponent } from "./sandbox.component"
import { provideRoutes, RouterModule, Routes } from "@angular/router"
import { components, modules } from "./config"
import { HostModule } from "./host.module"

export const routes: Routes = [
    {
        path: "sandbox",
        component: SandboxComponent,
        children: components,
    },
]

@NgModule({
    declarations: [SandboxComponent],
    imports: [CommonModule, RouterModule, HostModule, modules],
    providers: [provideRoutes(routes)],
})
export class SandboxModule {}
