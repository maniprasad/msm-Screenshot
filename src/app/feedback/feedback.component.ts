import { Component, OnInit , Inject , ViewChild, ElementRef , ViewContainerRef, ComponentFactoryResolver, TemplateRef, ViewChildren } from '@angular/core';
import {MatDialog , MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import { DataService } from '../service';

// export interface DialogData {
//   animal: string;
//   name: string;
// }


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

     @ViewChild('screen' , {static: false,  read: ElementRef }) screen: ElementRef;
    @ViewChild('canvas' , { static: false, read: ElementRef }) canvas: ElementRef;
  @ViewChild('downloadLink' , { static: false, read: ElementRef }) downloadLink: ElementRef;
  constructor(public dialog: MatDialog, private ts: DataService){}
  url: any;
  canvasdata: any ;
  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  openDialog() {
   html2canvas(this.screen.nativeElement, {scrollY: -window.scrollY}).then(canvas => {
      console.log( canvas);
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.canvasdata  = canvas.toDataURL('image/png');
      console.log(this.canvasdata);

      this.ts.outPutsubj({ name: this.canvasdata });
        });

   const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {  height: '330px', width: ' 640px',  data: {name : 'mani'}});

   dialogRef.afterClosed().subscribe(result => {
    console.log(result);
  });
  }
}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'screen-shot.html',
})
export class DialogOverviewExampleDialogComponent {
   img: any;
   serviceImg: any;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    // tslint:disable-next-line:max-line-length
    @Inject(MAT_DIALOG_DATA) public data: any , public ts: DataService, private viewContainerRef: ViewContainerRef , private el: ElementRef ) {}

    onYesClick(): void {
    this.dialogRef.close();
  }

     screenshot(): void{
       this.ts.output.subscribe((data1) => {
          console.log(data1);
          this.serviceImg = data1.name;
          const a = document.createElement('a');
          a.href =  data1.name;
          a.download = 'msmfeedBack';
          this.viewContainerRef.element.nativeElement.appendChild(a);
          a.click();
       });

     }


}
