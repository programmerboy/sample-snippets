import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Validators, FormArray, FormBuilder, FormControl, AbstractControl, FormGroup, PatternValidator } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { debounceTime, distinctUntilChanged, switchMap, filter } from "rxjs/operators";
import { REGEX } from 'src/app/shared/const/regex';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit, AfterViewInit {

  public numericInputElement!: HTMLInputElement;
  public numericFormControl!: FormControl;
  private $textChanged: Subject<string> = new Subject<string>();

  public allowedChars = /^[\d.]+$/;

  error: any;

  profileForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(REGEX.alpha)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(REGEX.alpha)]],
    address: this.fb.group({
      street: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      state: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      zip: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]]
    }),
    householdIncome: [, [Validators.required, Validators.maxLength(9), Validators.pattern(REGEX.number)]],
    householdCost: [, [Validators.required, Validators.maxLength(9), Validators.pattern(REGEX.number)]],
    aliases: this.fb.array([])
  });

  constructor(
    private _us: UtilityService,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.$textChanged
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((value) => {
          return of(value);
        }))
      .subscribe(val => {
        val = this._us.extractNumbers(val);
        this.numericFormControl.setValue(val);
        this.numericInputElement.value = this._us.convertToCurrency(val);
      });

    this.error = {};

  }

  ngAfterViewInit(): void {

    let ctrlObjects: any = {};

    let addError = (frmGroup: FormGroup) => {

      Object.keys(frmGroup.controls).forEach(key => {

        let frmCtrl = frmGroup.get(key);

        if (frmCtrl instanceof FormControl) {
          ctrlObjects[key] = frmCtrl;
          ctrlObjects[key].valueChanges.pipe(debounceTime(1000)).subscribe(() =>
            this.error[key] = this._us.getValidationMessages(ctrlObjects[key]));
        }
        else if (frmCtrl instanceof FormArray) {
          let frmArray = frmCtrl as FormArray;

          frmArray.controls.forEach((element, i) => {
            let childKey = `${key}-${i}`;
            ctrlObjects[childKey] = element;
            ctrlObjects[childKey].valueChanges.pipe(debounceTime(1000)).subscribe(() =>
              this.error[childKey] = this._us.getValidationMessages(ctrlObjects[childKey]));
          });

        }
        else if (frmCtrl instanceof FormGroup) {
          addError(frmCtrl);
        }

      });
    };

    addError(this.profileForm);

  }


  get fields() {
    return this.profileForm.controls;
  }

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  resetForm() {
    this.profileForm.reset({});
    this.aliases.clear();
  }

  applyCurrenyFormat(event: Event) {
    this.$textChanged.next(this.numericInputElement.value);
  }

  setGenericElement(event: FocusEvent, ctrl: AbstractControl) {
    this.numericInputElement = event.target as HTMLInputElement;
    this.numericFormControl = ctrl as FormControl;

    if (!this.numericInputElement.value.trim())
      this.numericInputElement.value = "$";
  }

  removeDollarSign() {
    if (!this._us.extractNumbers(this.numericInputElement.value.trim()))
      this.numericInputElement.value = "";
  }
}
