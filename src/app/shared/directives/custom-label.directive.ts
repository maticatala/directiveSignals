import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;
  private _isDirty?: boolean;

  @Input()
  set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input()
  set isDirty(value: boolean | undefined) {
    this._isDirty = value;
  }

  @Input()
  set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    if (this._isDirty) this.setErrorMessage();
  }

  constructor( private el: ElementRef<HTMLElement> ) {
    this.htmlElement = el;
  }

  ngOnInit(): void {
    this.setStyle();
  }

  setStyle(): void {
    if (!this.htmlElement) return;
    this.htmlElement.nativeElement.style.color = this._color;
    this.htmlElement.nativeElement.classList.add('d-none');
  }

  setErrorMessage(): void {

    if (!this.htmlElement) return;

    const element = this.htmlElement.nativeElement;

    if (!this._errors) {
      element.classList.add('d-none');
      return;
    }

    element.classList.remove('d-none');

    const errors = Object.keys(this._errors);

    if (errors.includes('required')) {
      element.innerHTML = 'Este campo es requerido';
      return;
    }

    if (errors.includes('minlength')) {
      const minlength = this._errors['minlength'];

      element.innerHTML = `El minimo de caracteres es ${minlength.requiredLength} y llevas ${minlength.actualLength}`;
      return;
    }

    if (errors.includes('email')) {
      element.innerHTML = 'email invalido';
      return;
    }
  }

}
