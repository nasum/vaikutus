FROM python:3.6.5-slim

ENV APP_ROOT /usr/src/app

WORKDIR $APP_ROOT

RUN pip install --upgrade pip &&\
    pip install pipenv

COPY Pipfile Pipfile.lock $APP_ROOT/

RUN pipenv install

COPY . $APP_ROOT

EXPOSE 8000
CMD ["pipenv", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]