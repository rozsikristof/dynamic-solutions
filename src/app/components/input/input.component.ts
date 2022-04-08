import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { InputValidator } from 'src/app/interfaces/input-validator.interface';

@Component({
  selector: 'ds-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class InputComponent {
  @Input() placeholder: string;
  @Input() title: string;
  @Input() validators: InputValidator[];
  @Input() required: boolean;
}
