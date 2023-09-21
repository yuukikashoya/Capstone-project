import { formatDate } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Database, onValue, ref } from '@angular/fire/database';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-sales-graph',
  templateUrl: './sales-graph.component.html',
  styleUrls: ['./sales-graph.component.css']
})
export class SalesGraphComponent implements OnInit, AfterViewInit {
  @ViewChild('salesCanvas') canvasRef!: ElementRef;
  private ctx!: CanvasRenderingContext2D;
  currentDate: Date = new Date();
  // Sample data (replace with your actual sales data)
  private salesData = [0, 2, 0, 2, 0, 0, 0];
  currentday = formatDate(new Date(), 'MM~dd~yyyy', 'en')
  yes1 : Date = new Date();
  yes2 : Date = new Date();
  yes3 : Date = new Date();
  yes4 : Date = new Date();
  yes5: Date = new Date();
  yes6 : Date = new Date();
  ye = ''
  ye1 =''
  ye2 = ''
  ye3 = ''
  ye4 = ''
  ye5 = ''
  ye6 = ''
  today= 0
  l1=0
  l2=0
  l3=0
  l4=0
  l5=0
  l6=0
  constructor(private db: AngularFireDatabase, public database:Database,) {
    this.yes1.setDate(this.currentDate.getDate() - 1);
    this.yes2.setDate(this.currentDate.getDate() - 2);
    this.yes3.setDate(this.currentDate.getDate() - 3);
    this.yes4.setDate(this.currentDate.getDate() - 4);
    this.yes5.setDate(this.currentDate.getDate() - 5);
    this.yes6.setDate(this.currentDate.getDate() - 6);
    this.ye = formatDate(this.currentDate, 'MM~dd~yyyy', 'en');
    this.ye1 = formatDate(this.yes1, 'MM~dd~yyyy', 'en');
    this.ye2 = formatDate(this.yes2, 'MM~dd~yyyy', 'en');
    this. ye3 = formatDate(this.yes3, 'MM~dd~yyyy', 'en');
    this.ye4 = formatDate(this.yes4, 'MM~dd~yyyy', 'en');
    this.ye5 = formatDate(this.yes5, 'MM~dd~yyyy', 'en');
    this.ye6 = formatDate(this.yes6, 'MM~dd~yyyy', 'en');

    const starCountRef = ref(this.database, '/sales/daily/'+ this.currentday);
    onValue(starCountRef, (snapshot) => {
     const db = snapshot.val();  
     if (db && db.sales) {
      this.today = Number(db.sales);

    } else {
      this.today = 0;
    }
     });
     const starCountRef2 = ref(this.database, '/sales/daily/'+ this.ye1);
     onValue(starCountRef2, (snapshot) => {
      const db2 = snapshot.val();  
      if (db2 && db2.sales) {
       this.l1 = Number(db2.sales);
 
     } else {
       this.l1 = 0;
     }
      });
      const starCountRef3 = ref(this.database, '/sales/daily/'+ this.ye2);
      onValue(starCountRef3, (snapshot) => {
       const db3 = snapshot.val();  
       if (db3 && db3.sales) {
        this.l2 = Number(db3.sales);
  
      } else {
        this.l2 = 0;
      }
       });
       const starCountRef4 = ref(this.database, '/sales/daily/'+ this.ye3);
       onValue(starCountRef4, (snapshot) => {
        const db4 = snapshot.val();  
        if (db4 && db4.sales) {
         this.l3 = Number(db4.sales);
   
       } else {
         this.l3 = 0;
       }
        });
        const starCountRef5 = ref(this.database, '/sales/daily/'+ this.ye4);
        onValue(starCountRef5, (snapshot) => {
         const db5 = snapshot.val();  
         if (db5 && db5.sales) {
          this.l4 = Number(db5.sales);
    
        } else {
          this.l4 = 0;
        }
         });
         const starCountRef6 = ref(this.database, '/sales/daily/'+ this.ye5);
         onValue(starCountRef6, (snapshot) => {
          const db6 = snapshot.val();  
          if (db6 && db6.sales) {
           this.l5 = Number(db6.sales);
     
         } else {
           this.l5 = 0;
         }
          });
          const starCountRef7 = ref(this.database, '/sales/daily/'+ this.ye6);
         onValue(starCountRef7, (snapshot) => {
          const db7 = snapshot.val();  
          if (db7 && db7.sales) {
           this.l6 = Number(db7.sales);
     
         } else {
           this.l6 = 0;
         }
          });

          this.customLabels = [this.ye6, this.ye5, this.ye4, this.ye3, this.ye2, this.ye1,this.ye];
    
   }




  ngOnInit() {
  }

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    
    // Introduce a delay of 1 second (1000 milliseconds)
    setTimeout(() => {
      // Update salesData with today, l1, l2, l3, l4, l5, and l6
      this.salesData = [this.l6, this.l5, this.l4, this.l3, this.l2, this.l1, this.today];
      
      // Call the drawChart method
      this.drawChart();
    }, 1000); // 1000 milliseconds = 1 second
  }
  
// Define an array of custom label names
public customLabels = [this.ye6, this.ye5, this.ye4, this.ye3, this.ye2, this.ye1,this.ye];

private drawChart() {
  const canvas = this.canvasRef.nativeElement;
  const ctx = this.ctx;
  const width = canvas.width;
  const height = canvas.height;
  const padding = 20;
  const maxValue = Math.max(...this.salesData);
  const xStep = (width - 5 * padding) / (this.salesData.length - 1);
  const yStep = (height - 5 * padding) / maxValue;

  // Clear the canvas
  ctx.clearRect(0, 0, width, height);

  // Draw axes
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  
  // Draw data points and lines
  ctx.beginPath();
  ctx.strokeStyle = '	#f97c7c';
  ctx.lineWidth = 8;

  for (let i = 0; i < this.salesData.length; i++) {
    const x = padding + i * xStep + 50; // Add an offset of 50 to move to the right
    const y = height - padding - this.salesData[i] * yStep;

    // Draw data point
    ctx.arc(x, y, 0, 0, Math.PI * 2);

    // Draw data value
    ctx.fillStyle = 'black';
    ctx.font = 'bold 12px Arial';
    ctx.fillText(this.salesData[i].toString(), x - ctx.measureText(this.salesData[i].toString()).width / 2, y - 20);

    // Draw custom label below the graph
    const label = this.customLabels[i];
    ctx.fillStyle = 'black';
    ctx.fillText(label, x - ctx.measureText(label).width / 2, height - 5);
  }

  ctx.stroke();
  ctx.closePath();
}

}