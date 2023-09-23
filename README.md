# Vacation Management System
The Vacation Management System is a web application that allows employees to request vacations and manages vacation balances. The system have three layers: a database, an API, and a front-end interface.

### Before Start
The system has 3 layers VacationManagementSystem.Api, VacationManagementSystem.Db, VacationManagementSystem.UI (Angular)

#### Getting Start
1. Clone the repo
2. in VacationManagementSystem.Api and VacationManagementSystem.Db Add-Migration and Update-Database
3. in VacationManagementSystem.UI project run in CMD npm install or npm install --force
4. run the in VacationManagementSystem.Api in backend to run the serve
5. run VacationManagementSystem.UI using CMD (ng serve --open) to launch the frontend serve
6. By Default the admin user is seeding in the database within the migration
7. Username: admin@admin.com | Password: admin@123
8. Admin can view all vacation requests and can approved each of it
9. Admin can see all employees in the system
10. Admin can add new employee from '/register' page by default the employee with role 'User'
11. User can see his vacations and can request new vacation and pending for Admin approval

### Technology used
1. ASP.NET Core Web API
2. Entity Framework Core
3. LINQ
4. JWT for security
5. Angular (services, guards, etc.)
