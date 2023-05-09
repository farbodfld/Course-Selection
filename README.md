# Course-Selection
Most of the current web systems have two parts of code, one is the server side and the other is the user side. In this exercise, we are trying to use js.Express,
js.Node, Git, Mongoose to design the server side code of a web-based unit selection system.

## Description of entity information
Mandatory fields to be implemented are mentioned below. 

In general, all entities must include the following information, and the specific information of each entity is listed below:

### Comprehensive user information
* Name and surname
* Student/professor/user number
* Password
* Email
* Mobile phone
#### Student
* Educational level
* Entry year
* Incoming semester
* GPA
* Faculty
* Field of Study
#### Professor
* Faculty
* Field of Study
* Order
#### educational manager
* Faculty
### IT manager
#### Approved course
* Course name
* Prerequisite(s)
* Co-requirement(s)
* Unit
### Term lesson
In addition to the characteristics of the approved course, it will also include the following information:
* Class date and time
* Exam date and time
* Exam location
* Lecturer
* Capacity
* Academic semester

## General endpoints
* POST /login

Other endpoints will require authentication to check if the user is logged in or not.


If the login operation was not performed, it should be answered with an appropriate error.
### IT manager
#### Create, edit, delete, receive professors and list of professors
* POST /admin/Professor
* PUT /admin/Professor/{ID}
* DELETE /admin/Professor/{ID}
* GET /admin/Professors
* GET /admin/Professor/{ID}
#### Create, edit and delete, receive students and list of students
* POST /admin/student
* PUT /admin/student/{ID}
* DELETE /admin/student/{ID}
* GET /admin/students
* GET /admin/student/{ID}
#### Create, edit and delete, receive training manager and list of managers
* POST /admin/manager
* PUT /admin/manager/{ID}
* DELETE /admin/manager/{ID}
* GET /admin/managers
* GET /admin/manager/{ID}
* See the list of courses
### Director of Education
#### Creating, editing and deleting approved courses and semesters
* POST / course
* PUT /course/{ID}
* DELETE /course/{ID}
* GET /courses
* GET /course/{ID}
#### Viewing the list of professors and students
* GET /students
* GET /student/{ID}
* GET /Professors
* GET /Professor/{ID}
### Student
Edit your changeable information (here you must check that the ID sent is related to you).


must be a student, otherwise it will be answered with an appropriate error (
* PUT /student/{ID}
* See the list of courses with the possibility of filtering according to the field
* GET /courses
* GET /course/{ID}
### Professor
Edit your changeable information (here, as in the previous case, similar to validation)
be suitable.
* PUT /Professor/{ID}
* See the list of courses with the possibility of filtering according to the field
* GET /courses
* GET /course/{ID}
