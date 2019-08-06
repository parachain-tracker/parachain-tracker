import { Component } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Message } from "@parachain-tracker/api-interfaces"

@Component({
    selector: "pt-root",
    template: `
        <pt-layout><router-outlet> </router-outlet></pt-layout>
    `,
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    hello$ = this.http.get<Message>("/api/hello")
    constructor(private http: HttpClient) {}
}
