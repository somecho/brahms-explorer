<!-- Why? Who? What? How? --> 
# The B.R.A.H.M.S. Explorer
The B.R.A.H.M.S. Explorer is a searchable catalog for contemporary music built formusicians, students, teachers and concert organizers. It allows for easy keywords-based search for pieces in the contemporary repertoire. It's great if you're looking for a contemporary piece for some obscure instrumentation _(let's say ... viola and tuba)_ to perform next. Try it out for yourself [here](https://brahmsexplorer.onrender.com/).

#### It features
- 40,000+ pieces worth of data collected from IRCAM's B.R.A.H.M.S. catalog
- simple, powerful keyword search
- sortable results
- adding, editing and deleting functionality for admins
- Google OAuth for user authentification
- automatic synchronisation with IRCAM's database

### What is this for?
IRCAM's B.R.A.H.M.S. database is a valuable resource, hosting large amounts of data about contemporary pieces, composers and even events. As a performer of new music, I often find myself looking through this database for my next pieces. However, the search page is a complex form to fill. It features multiple search fields, some for oddly specific details like who the musical assistant is, or whether the piece was written in IRCAM. Searching by instrumentation is also rather convoluted. An arbitrary set of instrumentation groups like "Non-standard mixed instrumental ensemble" or "single wind orchestra" is used to categorize the pieces. 

This explorer solves this by having a super simple search mechanism: keywords. Just type the keywords you want to have included in your search result. Additionally, results can be sorted by title, first name or last name of composer, year and subtitle. This wasn't possible in IRCAM's B.R.A.H.M.S. search page. 

### The Data
As mentioned, the data is collected by scraping the B.R.A.H.M.S. database page by page. This is done with [a Flask application](https://github.com/somecho/brahms-explorer/tree/master/sync) which fetches each page in IRCAM's database, checks to see if there are any new pieces or composers and then writes it to a MySQL database hosted on Planetscale. [A Github Action](https://github.com/somecho/brahms-explorer/blob/master/.github/workflows/sync.yaml) runs the synchronisation application once a week to keep the data updated. 

This explorer also allows admins (selected users that I authorize) to manually add, edit and delete pieces from the database. In other words, this database contains additional data that augments IRCAM's B.R.A.H.M.S. database. [A Flask backend](https://github.com/somecho/brahms-explorer/tree/master/backend) is used to serve data from the MySQL database, which is then consumed by [the React frontend](https://github.com/somecho/brahms-explorer/tree/master/frontend).

### Approach
I chose this modular approach because I wanted to learn about microservices. Aside from this, I wanted to leverage free-tier offered by the PaaS provider Render. Both front and backends are hosted on Render, with the frontend being a static site with high availability across the globe and the backend being a small webservice. Having this modular architecture meant that the services are not stuck to one provider and, if necessary, a migration would be easy. 
