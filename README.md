<div align="center">
<img src="./assets/logo.png" width="360" />
<hr>
</div>

The B.R.A.H.M.S. is a searchable catalog for contemporary music with data from
IRCAM's [B.R.A.H.M.S database](https://brahms.ircam.fr/en/). This project
consists of multiple services:
- [Frontend](frontend/)
- [Backend](backend/)
- [Sync service](sync-service/)
- [Cron](cron/)

## Frontend
The frontend is built with React. It's where users [can use the
app](https://brahmsexplorer.onrender.com). The frontend is hosted on Render as a
static site.

## Backend
The backend is a Flask application. It acts as a middleman between the database
(hosted on Planetscale) and the frontend. All the data the frontend needs, it
gets via the backend. The backend is hosted on Render as a web service.

##  Sync service
The sync service is another Flask application. It scrapes IRCAM's website to
keep the database up-to-date. 

## Cron
A cron job hosted on Vercel hits a sync service's endpoint which starts the job.
The job is set to run twice a day. The cron job is written with Flask.