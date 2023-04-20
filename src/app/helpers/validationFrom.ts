import {  FormControl, FormGroup } from '@angular/forms'


export default class validationFrom{







    static  ValidatorAllFieldsCheck(formGroup : FormGroup)
    {
  
      Object.keys(formGroup.controls).forEach(FindField => {
        
        const controlsData = formGroup.get(FindField);

        if(controlsData instanceof FormControl)
        {
          controlsData.markAsDirty({onlySelf : true});
        }
        else if( controlsData instanceof FormGroup ){
          this.ValidatorAllFieldsCheck(controlsData);
        }
      })
    }
}