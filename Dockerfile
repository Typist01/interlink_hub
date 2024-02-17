FROM postgres:15

# Use environment variables for sensitive information
ENV POSTGRES_DB=interlink_database
ENV POSTGRES_USER=postgres_user
ENV POSTGRES_PASSWORD=password

EXPOSE 5432

CMD ["postgres"]