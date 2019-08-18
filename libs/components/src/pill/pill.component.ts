import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges } from "@angular/core"

function hashCode(str) {
    // java String#hashCode
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        // tslint:disable-next-line:no-bitwise
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    return hash
}

function intToRGB(i) {
    // tslint:disable-next-line:no-bitwise
    const c = (i & 0x00ffffff).toString(16).toUpperCase()

    return "#" + "00000".substring(0, 6 - c.length) + c
}

@Component({
    selector: "pt-pill",
    template: `
        <div class="pill-icon"></div>
        <div class="pill-label" [textContent]="label"></div>
    `,
    styleUrls: ["./pill.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PillComponent implements OnChanges {
    @Input()
    public label: string

    @Input()
    public color: string

    @HostBinding("style.color")
    public calculatedColor: string

    public ngOnChanges() {
        this.calculatedColor = this.color || intToRGB(hashCode(this.label))
    }
}
