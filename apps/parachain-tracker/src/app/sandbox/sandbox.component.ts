import {
    ChangeDetectionStrategy,
    Component,
    ComponentFactoryResolver,
    OnDestroy,
    ViewChild,
} from "@angular/core"
import { Router, RouterOutlet, Routes } from "@angular/router"
import { Subscription } from "rxjs"

function createPaths(config: Routes, paths: string[], parent: string = "") {
    config.forEach(route => {
        paths.push(parent ? `${parent}/${route.path}` : route.path)

        if (route.children) {
            createPaths(route.children, paths, route.path)
        }
    })

    return paths
}

@Component({
    selector: "pt-sandbox",
    template: `
        <div class="navigation">
            <a
                *ngFor="let path of paths"
                [href]="path"
                [innerText]="path"
                [class.is-active]="path === activePath"
            ></a>
        </div>
        <div class="content">
            <router-outlet (activate)="handleRouteChange($event)"></router-outlet>
        </div>
    `,
    styleUrls: ["./sandbox.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxComponent implements OnDestroy {
    @ViewChild(RouterOutlet, { static: true })
    public outlet: RouterOutlet

    public paths: string[]

    public activePath: string

    private sub: Subscription

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private router: Router,
    ) {
        this.sub = new Subscription()
        this.paths = createPaths(this.router.config, [])
    }

    public handleRouteChange(componentInstance) {
        const {
            component,
            snapshot: { data },
            routeConfig: { path },
        } = this.outlet.activatedRoute

        this.sub.unsubscribe()
        this.sub = new Subscription()

        this.activePath = path

        if (typeof component !== "string") {
            const factory = this.componentFactoryResolver.resolveComponentFactory(component)
            const inputs = Object.values(factory.inputs)
            const outputs = Object.values(factory.outputs)

            for (const { templateName, propName } of inputs) {
                componentInstance[propName] = data[templateName]
            }
            for (const { templateName, propName } of outputs) {
                componentInstance[propName].subscribe(event => {
                    console.log(`event(${templateName}):`, event)
                })
            }
        } else {
            throw new Error(`Cannot resolve component by string, expected "Type<any>"`)
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe()
    }
}
