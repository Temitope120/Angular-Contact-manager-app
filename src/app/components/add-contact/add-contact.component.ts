import { ContactService } from './../../Services/contact.service';
import { IGroup } from './../../Models/iGroup';
import { Icontact } from './../../Models/iContact';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading:boolean = false;
  public contact: Icontact = {} as Icontact
  public errorMessage:  string | null = null;
  public groups: IGroup[] = [] as IGroup[];

  constructor(private ContactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.ContactService.getAllGroups().subscribe((data:IGroup[]) => {
      this.groups = data;
    }, (error:any) =>{
      this.errorMessage = error;
    } )
  }

  public addNewContact(){
    this.ContactService.createContact(this.contact).subscribe((data: Icontact) => {
      this.router.navigate(['/']).then()
    }, (error)=> {
      this.errorMessage = error;
      this.router.navigate(['/contacts/add']).then();
    })
  }

}
