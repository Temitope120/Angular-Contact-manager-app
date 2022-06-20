import { IGroup } from './../../Models/iGroup';
import { Icontact } from './../../Models/iContact';
import { ContactService } from './../../Services/contact.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
  public loading:boolean = false;
  public contact:Icontact = {} as Icontact;
  public errorMessage:string | null = null
  public contactId:string | null = null;
  public group:IGroup = {} as IGroup;

  constructor(private activatedRoute : ActivatedRoute, private contactService :ContactService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:ParamMap) => {
      this.contactId = param.get('contactId')
    });
    if(this.contactId){
      this.loading = true;
      this.contactService.getContact(this.contactId).subscribe((data: Icontact)=> {
        this.contact = data
        this.loading = false;
        this.contactService.getGroup(data).subscribe((data:IGroup) => {
          this.group = data
        })
      },(error) => {
        this.loading = false
      })
    }
   
  }
  public isNotEmpty(){
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0
  }

}
