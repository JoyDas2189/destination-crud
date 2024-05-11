import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LocationService } from '../../Services/location.service';
import { DialogRef } from '@angular/cdk/dialog';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-add-locations',
  templateUrl: './add-locations.component.html',
  styleUrl: './add-locations.component.css',
})
export class AddLocationsComponent {
  locationForm: FormGroup;
  popular: string[] = ['Popular', 'UnPopular'];
  suggested: string[] = ['Recommended', 'Not Recommended'];

  constructor(
    private _formBuilder: FormBuilder,
    private _locationService: LocationService,
    private _dialogRef: MatDialogRef<AddLocationsComponent>,
    private _coreService: CoreService
  ) {
    this.locationForm = this._formBuilder.group({
      locationName: '',
      description: '',
      locationType_id: '',
      isPopular: '',
      isSuggested: '',
    });
  }
  onFormSubmit() {
    if (this.locationForm.valid) {
      this._locationService.addlocation(this.locationForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Location Added Successfully', 'Done');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}
