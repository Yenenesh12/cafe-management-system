import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, NgbModalModule],
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css']
})

export class CartModalComponent {
  @Input() product: any;
  constructor(public activeModal: NgbActiveModal, private service: ProductService) {}

  SubmitOrder()
  {
    let order:ApproveOrderDto={
      id:this.product.id,
      customerId:'1',
      price:this.product.price
  }
  this.service.approveOrder(order).subscribe((res)=>{
    if(res){

    }
    else{

    }
  })}
}

 interface ApproveOrderDto{
  id:number;
  customerId:string;
  price:number;
}
