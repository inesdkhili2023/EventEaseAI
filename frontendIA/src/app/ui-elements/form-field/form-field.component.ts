import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SimpleFormFieldComponent } from './simple-form-field/simple-form-field.component';
import { FormFieldAppearanceVariantsComponent } from './form-field-appearance-variants/form-field-appearance-variants.component';
import { FfwErrorMessagesComponent } from './ffw-error-messages/ffw-error-messages.component';
import { FfWithHintsComponent } from './ff-with-hints/ff-with-hints.component';
import { FfWithLabelComponent } from './ff-with-label/ff-with-label.component';
import { FfwPrefixSuffixComponent } from './ffw-prefix-suffix/ffw-prefix-suffix.component';
import { FfThemingComponent } from './ff-theming/ff-theming.component';

@Component({
    selector: 'app-form-field',
    standalone: true,
    imports: [RouterLink, SimpleFormFieldComponent, FormFieldAppearanceVariantsComponent, FfwErrorMessagesComponent, FfWithHintsComponent, FfWithLabelComponent, FfwPrefixSuffixComponent, FfThemingComponent],
    templateUrl: './form-field.component.html',
    styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {}