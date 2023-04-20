import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetailsService } from 'src/app/Services/CarDetailsData/car-details.service';
import { UserDataComponent } from '../user-data/user-data.component'

class CarDetails {
  id!: number;
  model!: string;
  brandName!: string;
  imageUrl!: string;
  price!: any;
  year!: number;
  new!: boolean;


}

@Component({
  selector: 'app-show-item-details',
  templateUrl: './show-item-details.component.html',
  styleUrls: ['./show-item-details.component.css']
})
export class ShowItemDetailsComponent {
  private imageSrc: string = '';

  Id !: any;
  CarId !: number;
  CarData !: any;

  isShowUpdate !: boolean;
  isShowSave !: boolean;

  fileName = '';


  //ngModel

  id !: number;
  model !: string;
  brandName!: string;
  imageUrl!: string;
  price!: number;
  year!: number;
  New!: boolean;

  constructor(private route: ActivatedRoute,
    private _CarDetailsService: CarDetailsService,
    private router: Router

  ) {

  }


  CarObj: CarDetails = new CarDetails();

  cardata: CarDetails[] = [];

  Heading !: string;

  ngOnInit(): void {


    // CarData 

    this.Id = this.route.snapshot.paramMap.get('id');
    this.CarId = +this.Id
    if (this.CarId != 0) {
      this.Heading = "Update";
      this.isShowSave = false;
      this.isShowUpdate = true;
      this._CarDetailsService.GetByIdCarData(this.CarId).subscribe(
        {
          next: ((res: any) => {

            this.CarObj = res;

            console.log(this.CarObj)
            // this.id = this.CarObj['id'];
            // this.model =  this.CarObj.model;
            // this.brandName = this.CarObj.brandName;
            // this.imageUrl =  this.CarObj.imageUrl;
            // this.price = this.CarObj.price;
            // this.year =  this.CarObj.year;
            // this.New =  this.CarObj.new;
          })
        }
      )
    }
    else {
      this.Heading = 'save'
      this.isShowSave = true;
      this.isShowUpdate = false;
    }



  }

  // cancel
  cancel() {
    this.isShowSave = false;
    this.isShowUpdate = false;
    this.router.navigate(['/Home'])
  }

  //Updatedata

  UpdateData(): any {
    

    // let body = {
    //   id: this.id,
    //   model: this.model,
    //   brandName: this.brandName,
    //   imageurl: this.imageUrl,
    //   price: this.price,
    //   new: true,
    //   year: this.year

    // }
    this.CarObj.new
    return this._CarDetailsService.UpdateCarDetails(this.CarObj).subscribe(
      (resp: any) => {
        
        this.CarObj = resp;
        this.router.navigate(['/Home'])

      }
    )

  }



  // saveDataCar
  saveData() {

    // this.CarObj.new = JSON.parse(String(this.CarObj.new));   //returns true


    let body = {
      id: this.CarObj.id,
      model: this.CarObj.model,
      brandName: this.CarObj.brandName,
      imageurl: this.CarObj.imageUrl,
      price: this.CarObj.price,
      new: true,
      year: this.CarObj.year

    }

    this._CarDetailsService.SaveCarData(body).subscribe({
      next: (res: boolean) => {
        if (res == true) {
          this.router.navigate(['/Home']);
        }

      }
    })
  }


  getBase64(event: any) {
    
    var data;

    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      //console.log('xxxxx',reader.result);
      data = reader.result;
    };

    this.CarObj.imageUrl = String(data)

    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }



  handleInputChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.imageSrc = reader.result;
    this.CarObj.imageUrl = this.imageSrc;
  }


}
