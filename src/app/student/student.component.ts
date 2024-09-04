import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
 @ViewChild('myModal') model: ElementRef | undefined;
 studentObj: studentModel = new studentModel();
 studentList :studentModel[]=[];

 ngOnInit():void{
  this.getStudentList();
 }
      // openModel() {
           
      //   const sdtmodel = document.getElementById('myModal');
      //   if(sdtmodel != null){
      //     sdtmodel.style.display = 'block';
      //   }

      // }

      // closeModel(){
      //   if(this.model !=null){
      //     this.model.nativeElement.style.display = 'none'
      //   }
      // }

      openModel() {
        if (this.model) {
          this.model.nativeElement.style.display = 'block';
        }
      }
    
      closeModel() {
        this.studentObj = new studentModel();
        if (this.model) {
          this.model.nativeElement.style.display = 'none';
        }
      }

      onSaveform() {
        const localData = localStorage.getItem('studentdata');
        let stdData: studentModel[] = [];
    
        if (localData != null) {
          stdData = JSON.parse(localData); // Parse existing data
          this.studentObj.id=stdData.length+1;
        }
    
        stdData.push(this.studentObj); // Add new student object
        this.studentObj.id =1;
        localStorage.setItem('studentdata', JSON.stringify(stdData)); // Save updated data
    
        this.closeModel();
        this.getStudentList();
      }

      onUpdateform(){
        const currentStudent = this.studentList.find(s=>s.id ===this.studentObj.id);
        if(currentStudent !=undefined){
          currentStudent.name =this.studentObj.name;
          currentStudent.mobile =this.studentObj.mobile;
          currentStudent.email =this.studentObj.email;
          currentStudent.gender =this.studentObj.gender;
          currentStudent.doj =this.studentObj.doj;
          currentStudent.address =this.studentObj.address;
          currentStudent.status =this.studentObj.status;
        }
        localStorage.setItem('studentdata',JSON.stringify(this.studentList));
        this.closeModel();
        this.getStudentList();
      }

      onDeleteStudent(data:studentModel){
        const isConfirm = confirm('Are you sure you want to delete this student?...');
        if(isConfirm){
          const currentStudent = this.studentList.findIndex(s=>s.id===this.studentObj.id);
          this.studentList.splice(currentStudent,1);
          localStorage.setItem('studentdata',JSON.stringify(this.studentList));
        }
      }

      onEditstudent(studentdata:studentModel){
        this.studentObj = studentdata;
        this.openModel();
      }

      getStudentList(){
        const localData = localStorage.getItem('studentdata');
        if(localData !=null){
          this.studentList=JSON.parse(localData)
        }
      }
      
}

export class studentModel{
  id : number;
  name :string;
  mobile:string;
  email :string;
  gender:string;
  doj:string;
  address:string;
  status : boolean;
  constructor(){
    this.id=0;
    this.name ="";
    this.mobile="";
    this.email="";
    this.gender="";
    this.doj="";
    this.address="";
    this.status= false;
  }

}
