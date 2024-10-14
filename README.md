# MEPOS

## Overview
This is the project repository for the MEPOS app built primarily with React and Sass 


## Project Description
MEPOS is a desktop-based online Point of Sale (POS) application designed to streamline sales operations. It includes distinct access levels for different user roles: Superadmins, Admins, Cashiers, and Customers. Each role has its own set of functionalities, ensuring efficient management and control of sales processes. The app is built using React, providing a responsive and user-friendly interface, suitable for businesses looking for an online solution to handle point-of-sale transactions.

## Design
 - The figma design that will be implemented for this project can be found [here](https://www.figma.com/design/OPYkul3bQAoqAAYWdYYnsx/MEPOS?m=dev) 


 ## Contribution Guide
  **_Steps to collaborate on the repository._**
  ### Cloning Repo  
  * Click on the "Code" button on the Repo page.
  * Copy the URL for the Repo "https://github.com/Kayphrosh/Mepos.git"
  * Open your Code Editor and  run `git clone` "git clone https://github.com/Kayphrosh/Mepos.git"

 ### _Add Upstream Repository_
  * Add a Remote to Upstream to your Repo:
      Using the command : `git remote add upstream https://github.com/Kayphrosh/Mepos.git`

  * Pull from upstream to download all changes in the project using `git fetch upstream`
  
 ### _Merge the changes into your main branch_
  * `git checkout main`
  * `git merge upstream/main`.


## Technology Stack
* Frontend: React.js, HTML, CSS, and SCSS for building the user interface.
* Backend:  for handling business logic and data management.
* Database:

## Architecture
The MEPOS project follows a *component-based* architecture typical of React applications.
The organization suggests a clear separation of concerns, with folders designated for components, assets, styles, and possibly services or utilities. 
This structure promotes modularity and reusability, making it easier to maintain and scale the application. The layout also indicates a focus on organizing components by functionality or role, aligning with the app's multi-user interface design.


## Codebase
* The MEPOS project codebase consists of a structured React application that includes folders for components, assets, styles, pages, features and utilities. 
* The codebase promotes modularity, with reusable components designed to handle specific functionalities, aligning with the multi-user interface requirements of the app. This structure enhances maintainability and scalability
