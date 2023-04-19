<div align="center">
<img src="./assets/logo.png" width="360" />
<hr>
</div>

The B.R.A.H.M.S. is a searchable catalog for contemporary music with data from
IRCAM's [B.R.A.H.M.S database](https://brahms.ircam.fr/en/). This project
consists of three separate components:
- [Frontend](frontend/)
- [Backend](backend/)
- [Sync](sync/)

## Frontend
The frontend is built with React. It's where users [can use the
app](https://brahmsexplorer.onrender.com). The frontend is a static site hosted
on Render.

## Backend
The backend is a Flask application. It acts as a middleman between the database
(hosted on Planetscale) and the frontend. All the data the frontend needs, it
gets via the backend. The backend is hosted on Render as a web service.

##  Sync service
The sync service is another Flask application. It scrapes IRCAM's website to
keep the database up-to-date. It is activated by a Github Actions cronjob.
