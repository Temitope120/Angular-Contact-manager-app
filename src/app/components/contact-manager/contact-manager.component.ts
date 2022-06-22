import { ContactService } from './../../Services/contact.service';
import { Icontact } from './../../Models/iContact';
import { Component, OnInit } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {
  public loading:boolean = false;
  public contacts: Icontact[] = [];
  public errorMessage: string | null = null;
  public searchText: string = "";
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getAllContactsFromServer()
  }

  public getAllContactsFromServer(){
    this.loading = true;
    this.contactService.getAllContacts().subscribe((data: Icontact[]) => {
      this.contacts = data;
      this.loading = false;
    },(error) => {
      this.errorMessage = error;
      this.loading = false;
    })
  }

  public deleteContact(contactId: string | undefined){
    if(contactId){
      this.contactService.deleteContact(contactId).subscribe((data)=> {
        this.getAllContactsFromServer()
      }, (error)=> {
        this.errorMessage = error
      })
    }
  }

  searchUser(searchValue: string){
    this.searchText = searchValue;
    console.log(searchValue)
  }

}
