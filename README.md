# Test: Nodeks + MongoDB + Angular + Docker

### Clone app from GitLab

First, clone from the following URL:

<pre>
$ git clone https://gitlab.com/osvelvargas/hn-feed.git
</pre>

### Building your docker image

<pre>

$ cd app_root/server

$ docker build -t osvelvargas/hn-feed .

</pre>

### Run application

<pre>
$ docker-compose up
</pre>

### If use hub docker. Pull application from hub.docker.com

<pre>
$ docker build -t osvelvargas/hn-feed .

$ docker-compose up
</pre>