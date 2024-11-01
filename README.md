# DJS03 Project Brief: Book Connect - Abstractions

Dive into the delightful world of "Book Connect," where literary adventures await at your fingertips! Browse, explore, and uncover your next great read from a vast, vibrant collection. Whether you're a fan of thrilling mysteries, epic fantasies, or heartwarming romances, "Book Connect" brings the magic of books directly to you. Happy reading! 

The "Book Connect" project provides an opportunity for students to refine a fully functional version of an application. The focus of this project is to enhance the code's maintainability, extendibility, and readability by applying concepts of objects and functions for abstraction. This will not only streamline future modifications but also consolidate students' understanding of higher-level programming concepts, including documentation, Styleguides, and abstraction principles.

![alt text](image.png)

#### Goals

- **Refactor Existing Code**: Analyse and refactor the given JavaScript and HTML code to improve its structure using objects and functions.
- **Implement Abstraction**: Use abstraction to hide the complex reality while exposing only the necessary parts. This involves creating more generic functions that can perform tasks in a more flexible way.
- **Documentation**: Write clear comments and documentation for the new code structure to explain the purpose and functionality of code blocks, functions, and objects.
- **Follow Styleguides**: Adhere to established coding conventions and Styleguides to ensure code readability and maintainability.

#### Tasks

1. **Code Analysis**: Start by understanding the current implementation of the "Book Connect" application, including its HTML structure and JavaScript functionality.
2. **Plan Refactoring**: Identify sections of the code that can be made more abstract and modular. Look for patterns and repetitive code that can be simplified.
3. **Implement Abstraction**:
   - **Objects**: Define objects to represent key elements of the application, such as books, authors, and genres. Utilise the provided data (e.g., `authors`, `genres`, `books`) to populate these objects.
   - **Functions**: Create functions that handle repetitive tasks, such as rendering the book list, handling user interactions, and applying filters.
4. **Enhance Functionality**: Ensure that the application remains fully functional after refactoring. Test all features to confirm that users can still search, filter, and view books as intended.
5. **Documentation and Comments**: Throughout the refactoring process, document your code. Provide comments that explain the purpose and functionality of objects and functions.
6. **Adherence to Styleguides**: Ensure your code follows JavaScript and HTML coding standards and best practices for readability and maintainability.

#### Discussion and Reflection

After completing the tasks, prepare a brief presentation for your coaching group on the following:
- The rationale behind the refactoring decisions made, including the choice of objects and functions.
- How abstraction has made the code more maintainable and extendable.
- Any challenges faced during the refactoring process and how they were overcome.
- Reflections on how this exercise has deepened your understanding of JavaScript programming concepts.

#### Submission Guidelines

Submit the refactored version of the "Book Connect" application, including all HTML, CSS, and JavaScript files. Ensure that your code is well-documented and adheres to the specified Styleguides. Include a written report covering the discussion and reflection points outlined above.

Make sure to submit your project to the LMS on the DJS03 Project Tab.

DJS03
Discussion and reflection

- The rationale behind the refactoring decisions made, including the choice of objects and functions.
   In the process of refactoring the "Book Connect" application, my primary goal was to enhance code maintainability, readability, and extendability. I achieved this primarily through the use of reusable functions to handle repetitive tasks, such as generating book preview buttons and populating generic dropdown options. This approach adheres to the DRY (Don't Repeat Yourself) principle, reducing code duplication and simplifying the code, ultimately improving readability.

- How abstraction has made the code more maintainable and extendable.
   Abstraction has been very helpful in simplifying complexity. By creating functions for tasks like button creation, I can avoid recreating the logic each time I need to update the button through the search function. If updates or changes need to be made, such as adding a property like the number of pages for each book, I can implement this change consistently across the site without worrying about inconsistencies, as the change only needs to be made where the function is defined.

- Any challenges faced during the refactoring process and how they were overcome.
   Initially, it was difficult to spot all instances of duplicated logic in the code and determine what changes should be made. I overcame this by carefully reading through the code and applying comments to clarify what each section achieves. This process allowed me to identify opportunities for abstraction, such as simplifying the cancel event listener function and creating a generic logic system for the dropdown options that could be applied to both genres and authors, rather than maintaining separate code for each section.
   
- Reflections on how this exercise has deepened your understanding of JavaScript programming concepts.
   This refactoring exercise was quite challenging and provided a clearer picture of coding in the real world, where you often receive a block of code that you need to piece together and resolve. I gained a deeper appreciation for the value of clear comments and abstracting code into modular blocks, where each function's role is clearly defined. This approach makes debugging and updating more intuitive, as it's easier to identify which sections of the code need attention. Even now, I see opportunities for further abstraction to clean up the code, such as creating constants for frequently repeated queries. Overall, it's evident that writing and commenting clean code is a significant time-saver, making maintenance and development much easier.

DJS04
Documentation of Creating Web Components
   Identify the element that could benefit from encapsulated as components
      in this example it is the book preview component, other components could include the dropdown selection
   In a seperate js for ease of reuse create a class component that extends the HTMLElement
    then proceed to attach the shadowDOM (attachShadow({mode: "open"})) can also be closed
    create a <style> element for any CSS styling
    create attributes
    finally add event handling, such as listeners or custom events
lastly export this with the Export syntax, and import into the main JS file with the correct file path and ensure where the even is called it is handled appropriately.


Challenges faced
   consol errors through recursion (set up an infinite loop)
      resolved this by creating a check to only call if the data has changed
         (name === 'data-id' && oldValue !== newValue)

   data attributes in the parent script being set incorrectly

   applying the CSS styling
      found out you can directly create a style element and apply the styling in the web component directly

Web components can clearly make functions and elements much easier to reuse, however they are much more finicky and complicated to set up initially so it is only worth while if you need to encapsulate the function or plan on reusing it at a later stage. IE, if i function is very unique and will only be used once it isn't really worth going through the process, however for something that has multiple uses, the extra time initially will be saved down the line with a much easier implementation.