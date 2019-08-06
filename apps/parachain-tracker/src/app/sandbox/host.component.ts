import {
    ChangeDetectionStrategy,
    Compiler,
    Component,
    ComponentRef,
    EventEmitter,
    Injector,
    Input,
    ModuleWithProviders,
    NgModule,
    OnDestroy,
    OnInit,
    Output,
    Provider,
    Type,
    ViewContainerRef,
} from "@angular/core"

@Component({
    selector: "pt-hosts",
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HostComponent implements OnInit, OnDestroy {
    @Input()
    public providers: Provider[]

    @Input()
    public imports: (any[] | Type<any> | ModuleWithProviders)[]

    @Input()
    public template: string

    @Input()
    public context: string

    private componentRef: ComponentRef<any>

    constructor(
        private compiler: Compiler,
        private injector: Injector,
        private viewContainerRef: ViewContainerRef,
    ) {}

    public ngOnInit() {
        @Component({
            selector: "pt-anonymous",
            template: this.template,
        })
        class AnonymousComponent {
            [key: string]: any

            @Output()
            public event = new EventEmitter()

            public emit(value) {
                this.event.emit(value)
            }
        }

        @NgModule({
            imports: this.imports,
            providers: this.providers,
            declarations: [AnonymousComponent],
            entryComponents: [AnonymousComponent],
        })
        class AnonymousModule {}

        const module = this.compiler.compileModuleAndAllComponentsSync(AnonymousModule)
        const moduleFactory = module.ngModuleFactory
        const moduleRef = moduleFactory.create(this.injector)
        const componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(
            AnonymousComponent,
        )
        const componentRef = this.viewContainerRef.createComponent(
            componentFactory,
            0,
            moduleRef.injector,
            null,
            moduleRef,
        )
        const data = this.context
        const keys = Object.keys(data)

        console.log("keys", data)

        for (const key of keys) {
            componentRef.instance[key] = data[key]
        }
        componentRef.instance.event.subscribe(event => {
            console.log(`event:`, event)
        })

        this.componentRef = componentRef
    }

    public ngOnDestroy() {
        this.componentRef.destroy()
    }
}
