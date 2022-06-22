import { IGroup } from './../Models/iGroup';
import { Icontact } from './../Models/iContact';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  

  constructor(private http: HttpClient) { }

  public getAllContacts():Observable<Icontact[]>{
    let dataURL:string = `${environment.serverUrl}/contacts`;
    return this.http.get<Icontact[]>(dataURL).pipe(catchError(this.handleError))
  }

  // Get single contacts
  public getContact(contactId:string): Observable<Icontact>{
    let dataURL:string = `${environment.serverUrl}/contacts/${contactId}`;
    return this.http.get<Icontact>(dataURL).pipe(catchError(this.handleError))
  }

  // create a contact
  public createContact(contact:Icontact):Observable<Icontact>{
    let dataURL:string = `${environment.serverUrl}/contacts`;
    return this.http.post<Icontact>(dataURL, contact).pipe(catchError(this.handleError))
  }


  // Update a contact
  public updateContact(contact:Icontact, contactId: string):Observable<Icontact>{
    let dataURL:string = `${environment.serverUrl}/contacts/${contactId}`;
    return this.http.put<Icontact>(dataURL, contact).pipe(catchError(this.handleError))
  }


  // Delete a contact
  public deleteContact(contactId:string):Observable<{}>{
    let dataURL:string = `${environment.serverUrl}/contacts/${contactId}`;
    return this.http.delete<{}>(dataURL).pipe(catchError(this.handleError))
  }
  // get all groups
  public getAllGroups(): Observable<IGroup[]>{
    let dataURL:string  = `${environment.serverUrl}/groups`;
    return this.http.get<IGroup[]>(dataURL).pipe(catchError(this.handleError))
  }
  // get a single group
  getGroup(contact: Icontact):Observable<IGroup>{
    let dataURL :string = `${environment.serverUrl}/groups/${contact.groupId}`

    return this.http.get<IGroup>(dataURL).pipe(catchError(this.handleError))

  }
  // Error handling
  public handleError(error: HttpErrorResponse){
    let errorMessage: string = ""
    if(error.error instanceof ErrorEvent){
      errorMessage = `Errror: ${error.status} \n Message: ${error.message}`
    }
    return throwError(errorMessage)
  }
}
