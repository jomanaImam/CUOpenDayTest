# Open Day Website: Requirements & Enhancements

## 1. Visual Design & Automatic Theming
* Dynamic Theme Switching: Implementing automatic theming that detects the user's system preferences.
    * Light Mode (Default): White background, accessible black text, Cardiff Red accents.
    * Dark Mode: Black background, accessible white text, Cardiff Red accents.
* Cardiff Brand Alignment: Replace current placeholder visual elements with official branding colors and typography.

## 2. Component Design & Interaction
* "Glow" Interaction: Applying a dynamic Red outer shadow/glow effect on cards when a user interacts.
* Date Badges: Redesign event lists to use sleek, distinct date and time badges instead of bullet points.

## 3. Advanced Layout & UX
* Hero Carousel: Implementing  a functional slider at the top of the homepage to showcase the Upcoming Events.
* Top Search Bar: Adding a search bar in the site header to allow instant navigation.
* Department Filters: Transition current card layout to use interactive category filter tabs (e.g., Computer Science, Architecture).
* Department Categories: To make things easier to find, I divided the departments into specific filter tabs (like "Physical Sciences & Engineering", "Arts, Humanities & Social", and "Campus Life").
* Back to Top: I added a floating button that appears when you scroll down, making it easy for users to jump right back to the top of the page.

## 4. Accessibility & Responsiveness
* Mobile Layout: Ensure all complex components, specifically the Carousel and Filtering system, degrade gracefully and are easily usable on mobile phones.
* WCAG Compliance: Correct all existing contrast failures such as the red text on dark gray. Use semantic HTML for correct navigation.

## 5. Event Cards & Google Maps Integration

* Interactive Cards: I gave the event cards a cool red glowing effect when you hover over them. When you click them, they have a 3D flip animation to reveal the scheduled times and details.

* Google Maps Routing: I added a location feature that pulls the building address and postcode from the data. It creates a button that takes the user directly to Google Maps so they can easily navigate the campus and find their event.