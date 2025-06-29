# API-Integration-

*COMPANY*: CODTECH IT SOLUTION 

*NAME*: ADHIKA SHAHANE

*INTERN ID*: CT1MTDF577

*DOMAIN*: FRONT END DEVELOPMENT

*DURATION*: 4 WEEKS

*MENTOR*: NEELA SANTOSH

** in this i used 

HTML (Structure) serves as the blueprint for your webpage. It establishes the structure and layout by utilising tags to generate components including as headers, input boxes, buttons, and placeholders. HTML provides a clear structure for a weather app, separating places for user input (such as city names) from dynamic material (such as temperature and conditions).

CSS styles HTML components to enhance their visual appeal and responsiveness. It sets the layout, colours, fonts, spacing, and alignment. It also adjusts the design to different screen sizes, offering a seamless experience across mobile and desktop platforms.

JavaScript adds interaction to webpages. It talks with external services (such as weather APIs), analyses the resulting data, and dynamically changes the HTML. JavaScript also handles user interactions, such as clicking a button to check the weather.
1.Preparation:
obtain an API key. This key allows your app to securely request weather data.
2. Project Setup:
Create a folder named weather-app in VS Code and inside it, create:
•	index.html (structure)
•	style.css (design)
•	script.js (functionality)
3. Building index.html:
This file defines your app's layout. Include:
•	<meta name="viewport"> for mobile responsiveness.
•	<link rel="stylesheet" href="style.css"> to connect your CSS.
•	Elements like <input> for city input and <button> to fetch data.
•	A <div> to display weather info.
•	<script src="script.js"></script> at the bottom to ensure scripts run after the page loads.
4. Designing with style.css:
Make your app visually appealing using CSS. Use display: flex, justify-content: center, and min-height: 100vh to center your layout. Make it responsive with media queries to adjust layout on smaller screens.
5. Adding Logic in script.js:
Replace YOUR_OPENWEATHERMAP_API_KEY with your actual API key. Use fetch() inside an async function to get weather data.
Add event listeners to handle button clicks and auto-load weather for a default city (e.g., Pune) when the website loads.
Frontend Calls Backend: Instead of calling OpenWeatherMap directly, your script.js would make a request to your own backend server
 Backend Calls External API: Your backend server receives the request. This backend code then makes the call to the OpenWeatherMap API, using your API_KEY.
Crucial Benefit: The API_KEY is stored securely on your server and is never exposed to the client-side (browser).
Run the App: Preview your app using VS Code's Live Server plugin. Alternatively, open index.html in your browser.**

*output*

![Image](https://github.com/user-attachments/assets/6f65b836-2dd7-4785-8ede-55a93b944603)
![Image](https://github.com/user-attachments/assets/88a7e127-673f-49cf-806b-0f9fed089650)
