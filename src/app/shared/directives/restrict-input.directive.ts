import { Directive, HostListener, Input } from "@angular/core";

@Directive({
    selector: '[restrictInput]'
})
export class RestrictInputDirective {
    @Input() restrictInput!: RegExp;

    @HostListener('keypress', ['$event'])
    restrictInputKeyPress(event: KeyboardEvent) {

        const value = event.key;

        if (!this.restrictInput.test(value)) {
            event.preventDefault();
        }
    }

    @HostListener('paste', ['$event'])
    restrictInputPaste(event: ClipboardEvent) {

        const value = event.clipboardData?.getData('Text') || "";

        if (!this.restrictInput.test(value)) {
            event.preventDefault();
        }
    }
}