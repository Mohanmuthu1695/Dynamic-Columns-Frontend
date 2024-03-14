# Dynamic Forms

This is an Angular project consisting of two primary components: Form Builder and Form Renderer. These components enable users to create dynamic forms through a drag-and-drop interface, render the forms, submit them, and view the submissions. And all the forms and submission are stored in a JSON format. This project is built using the FORMIO library, focusing on the client-side aspects, and excludes server-side functionality.



## Form Builder

The Angular Dynamic Form Builder is a powerful tool that allows users to create forms in the UI using a drag-and-drop interface. This project provides a user-friendly way to design forms with various components and layout options and then export the form's configuration or structure in JSON format.



## Form Renderer

The Angular Dynamic Form Renderer can then render the form in json format created previously by the form
builder for the user to fill up. After submitting the form, a JSON will be created with the values of the submission by the Form Renderer. Then submission JSON can also be used to prefill the Form Renderer or show the submission in read only mode in the Form Renderer.





## Development server

Run `npm run serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
