import { Inject, Injectable, NgModule } from "@angular/core"
import { ServerModule, ServerTransferStateModule } from "@angular/platform-server"

import { AppModule } from "./app.module"
import { AppComponent } from "./app.component"
import { ModuleMapLoaderModule } from "@nguniversal/module-map-ngfactory-loader"
import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http"
import { Observable } from "rxjs"

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    constructor(@Inject("serverUrl") private serverUrl: string) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiReq = req.clone({ url: `${this.serverUrl}${req.url}` })
        return next.handle(apiReq)
    }
}

@NgModule({
    imports: [AppModule, ServerModule, ModuleMapLoaderModule, ServerTransferStateModule],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: APIInterceptor,
            multi: true,
        },
    ],
})
export class AppServerModule {}
