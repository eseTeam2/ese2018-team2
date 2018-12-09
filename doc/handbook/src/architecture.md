# Architecture

This is a high-level overview of our architecture at _unijobs.me_.

## Back end

Das Back end verbindet mehrere Services miteinander und bündelt diese in einer GraphQL-Schnittstelle zusammen.

Die Sessions werden in Redis gespeichert. Das Model in PostGRES.

The back end bundles multiple services together and exposes those through a GraphQL powered API.

## Front end

The front end uses Next.js.