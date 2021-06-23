Cowin-Ping is a NodeJS program which sends a desktop alert periodically whenever a vaccine is available and matches a set of criteria.
The present criteria is as follows. Feel free to edit them in the code to suit your needs:

1. District ID = 297 (ID of Kannur district). IDs of other districts in Kerala are provided in the districts.json file.
2. Alert will be given if
    * A vaccine is available on the present day or on any of the 6 days that follow.
    * The vaccine is COVISHIELD.
    * The vaccine is free.
    * The dose is 1st dose.
    * The age category is 45+ years.
    * The API is called every 30 seconds.


---------------------------------------
API source:
Information is obtained using Cowin public APIs (https://apisetu.gov.in/public/marketplace/api/cowin)

---------------------------------------
Operating System:

The program has been tested on  Ubuntu. It should also run on Windows.

---------------------------------------
Initial setup:

1. Install Node.js and npm on your system.
2. Clone this repository.
3. Open the repository directory in the terminal.
4. Run the following command
    *   npm i

---------------------------------------
Steps to run the program:

1. Open the repository directory in the terminal.
2. Run the following commands:
    *   npm run build
    *   npm run start

3. On successful execution, an alert box will popup everytime there is a vaccine available which matches your criteria.
