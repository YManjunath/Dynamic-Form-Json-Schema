import {
  ChangeDetectionStrategy,
  OnChanges,
  Component,
  OnInit,
  Input,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

export interface Root {
  fields: Field[];
}

export interface Field {
  label: string;
  key: string;
  isRequired?: boolean;
  order: number;
  isReadonly: boolean;
  type: string;
  unit?: string;
  items?: Item[];
}

export interface Item {
  value: string;
  text: string;
}

export interface jsonFormData {
  fields: Field[];
}

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonFormComponent implements OnChanges {
  @Input() jsonFormData: jsonFormData;

  public myForm: FormGroup = this.fb.group({});

  constructor(private fb:FormBuilder, private toastr: ToastrService,) {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['jsonFormData'].firstChange) {
      console.log(this.jsonFormData);
      this.createForm(this.jsonFormData.fields);
    }
  }

  createForm(fields: Field[]){
    for(const field of fields){
      this.myForm.addControl(field.key, this.fb.control(''));
    }
  }

  onSubmit(){
    if(!this.myForm.valid){
      this.toastr.error('Please fill the required values!');
      return;
    }else {
      this.myForm.reset();
      console.log('Form Values', this.myForm.value)
    }
  }

  
}
