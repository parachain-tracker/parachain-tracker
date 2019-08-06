import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent } from "./app.component"
import { HttpClientModule } from "@angular/common/http"
import { RouterModule } from "@angular/router"
import { LayoutComponent } from "./layout/layout.component"

@NgModule({
    declarations: [AppComponent, LayoutComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot([
            {
                path: "",
                loadChildren: "./home/home.module#HomeModule",
            },
        ]),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
