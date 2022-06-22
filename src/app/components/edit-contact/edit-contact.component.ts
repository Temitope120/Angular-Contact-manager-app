import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ContactService } from 'src/app/Services/contact.service';
import { Component, OnInit } from '@angular/core';
import { Icontact } from 'src/app/Models/iContact';
import { IGroup } from 'src/app/Models/iGroup';


@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  public loading:boolean = false;
  public contact:Icontact = {} as Icontact;
  public errorMessage:string | null = null
  public contactId:string | null = null;
  public groups:IGroup[] = [] as IGroup[];
  constructor(private ContactService: ContactService, private activatedroute: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((param:ParamMap)=>{
      this.contactId = param.get('contactId');
    })
    if(this.contactId){
      this.ContactService.getContact(this.contactId).subscribe((data:Icontact) => {
        this.contact = data;
        console.log(data)
        this.loading = false
        this.ContactService.getAllGroups().subscribe((data) =>{
          this.groups = data
        } );
      }, (error)=>{
        this.errorMessage = error;
        this.loading = false
      })
    }
  }

  public update(){
    if(this.contactId){
      this.ContactService.updateContact(this.contact, this.contactId).subscribe((data: Icontact) => {
        this.router.navigate(['/']).then()
      }, (error)=> {
        this.errorMessage = error;
        this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
      })
    }
    
  }

}
