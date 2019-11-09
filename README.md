# Delivery Dashboard

![enter image description here](https://fc4ff615-5ac8-43fa-9f1a-0b13749c4a5c.ws-eu01.gitpod.io/#/workspace/Delivery_Dashboard/assets/static/images/responsive_site.JPG)

The dashboard will be used in the Delivery department to keep track of the KPIs performance throughout the financial year. The dashbord will give a graphic rapresentation of the data analysis allowing interaction between graphs (crossfilter and selectors available) as well as on hover information. The toggle Side bar one right gives the user the possibility to submit further change requests and he option to download the data source, for those willing to further explore our performance using differnt tools. The presentation is neat and minimalist to ensure it can be used in Power Point presentation across the business.


## UX

The general user for the project will be a Delivery department manager checking the perormance of our KPIs for the year. Considering the type of user the dashboard is clean and has a minimalist presentation.

After conducting a series of Voice of the Customers meetign the users needs have been identified as

-  Be able to check current perfomance vs KPI tgt at a glance
- Be able to identify possible issues i.e. which type of Delivery or Product has a low Cycle Time performance, to act on them and start further analysis, without too much detail cluttering the view
- Be able to interact with the data and reset the filters applied
- Be able to have a source of data consisten across the business to use for presentation and meetings.

I simple wireframe of the project was sketched here


## Features
A live demo of the site can be found [here](https://valenovi76.github.io/Delivery_Dashboard/)
DATA
the data used for the project is a mock-up of the data we currently produce on a SQL database
sensitive information has been scrambled.
The Database will eventually be linked to the dashboard to allow a live representation.
The original file was submitted in csv but was then converted into JSON

STRUCTURE
The dashboard presents 3 cards for KPIs representation.
They are the most coloured part of the projec to ensure they standout as the main message we want to provide.
The page is then divided in 3 sections for the graphs, according to the different theme they pertain to.
A toggle side bar menu is accessible on the left handside and allows the users to navigate to the Change Request page or to download the csv data file.


### Existing Features

The  3 cards on the header, rapresent our Key Perfomance Indicators, the corresponding target and a live feed from the data to show the current performance.

 - Selectors on the section below allow data filtering across the entire dashboard
 - A button to reset the graphs is available at the far end of this section as well as at the end of each section title.
 - The graphs are structured in 3 segments:
				Work In Progress analisys
				RFT and CT performance (KPIs)
				Product/Project/ Country Deliveries
 - The use of crossfilter throught the project ensures the graphs are all interacting with each other.
for example selecting one segment of the Order Type Pie graph will filter accordingly all the other graphs.
 - The dashboard is not mobile responsive because it is built to be used on Computer and Laptop devices. The interaction between the graphs would be lost on a mobile screen (especially phones).



### Features Left to Implement

 -   The dashboard will be linked to the the SQL database that provides our data.
 - Further pages will be added to show the performance of our business from a team and user perspective and the dashboard audience will be broaden
 - the Dashboard will be mobile responsive


## Technologies Used

- HTML
- CSS
- [Bootstrap](https://getbootstrap.com/)
- [EmailJS](https://www.emailjs.com/) : used to write change requests emails in JavaScript
- [Fontawsome](https://fontawesome.com/)
- JavaScript
- [d3.js](https://d3js.org) v3
- [crossfilter](https://github.com/square/crossfilter)
- [dc.js](https://dc-js.github.io/dc.js/)


##	Testing

Thorough testing was conducted on the data loading via console.log, crosserference against an excel pivot on the same data.
Further testing was conducted to ensure that the crossfilter was properly working across the graphs
A copy of the excel file built to test against the console logs and the crossfilter can be found [here](/assets/data/Data_testing.xlsx)
Below a picture of the test on the data load
![Testing Data](https://fc4ff615-5ac8-43fa-9f1a-0b13749c4a5c.ws-eu01.gitpod.io/#/workspace/Delivery_Dashboard/assets/static/images/Data_testing.JPG)

The Change Request form has been tested as per below proess

1.  Contact form:
    1.  Click on the Menu button
    2. Select "Change Requests Log"
    3.  Try to submit the empty: an error message about the required fields appears
    4.  Try to submit the form with an invalid email address: relevant error message appears
    5.  Try to submit the form with all inputs valid : the email send


The hardest issue I encountered was the parsing of the date to create the composite graph on the country deliveries.
I first thought the issue was the csv file and converted it into JSON.
Then realised the parsed date is returned in a date and time format regardless the fact the format specified is a different one.
This is also evident on the other graphs, where the field is plucked: the data labels become extremly big and overlap
Currently there seems to be no solution for the issue and I might have to abandon the idea of a composite line chart altogether.



## Deployment

This site is hosted using GitHub pages, deployed directly from the master branch.
The deployed site will update automatically upon new commits to the master branch.
In order for the site to deploy correctly on GitHub pages, the landing page is named index.html, and the current live site can be accessed [here](https://valenovi76.github.io/Delivery_Dashboard/).

## Credits

### Content

-   The sidebar menu was implemented following the tutorial from Bucky Roberts. Link to his [GitHub](https://github.com/buckyroberts)
- The contact form for the Change Requests was copied from [Bootstrapius](https://bootstrapious.com/p/how-to-build-a-working-bootstrap-contact-form)
- The graphs codes as well as the emailjs impelmentation were complted following the tutorials from CodeInstitute FullStack Developer Course. Link to GitHub for graphs
can be found [here](https://github.com/Code-Institute-Solutions/DataVisualisationMiniProject) and the one for the EmailJS can be found [here](https://github.com/Code-Institute-Solutions/InteractiveFrontendDevelopment-Resume)

### Acknowledgements

-   I received inspiration for this project from Damien Meere and Michael O'Farrell, my fellow students at the course.