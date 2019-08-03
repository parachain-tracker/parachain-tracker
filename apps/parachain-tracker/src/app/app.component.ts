import { Component } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Message } from "@parachain-tracker/api-interfaces"

@Component({
    selector: "pt-root",
    template: `
        <div style="text-align:center">
            <h1>Welcome to parachain-tracker!</h1>
            <img width="450" src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" alt="" />
        </div>
        <div>Message: {{ hello$ | async | json }}</div>
    `,
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    hello$ = this.http.get<Message>("/api/hello")
    constructor(private http: HttpClient) {}
}
