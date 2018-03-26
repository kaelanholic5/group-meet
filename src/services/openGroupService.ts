import { Injectable } from '@angular/core';

@Injectable()
export class OpenGroupService {
    
   groupName: string;


   constructor() {
       this.groupName = 'Blank';
   }
 
   setGroupName(groupName) {
       this.groupName = groupName;      
   }
 
   getGroupName() {
       return 
   }  
}