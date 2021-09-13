import requests


class opencourse_api:
    def __init__(self, campus):
        self._API_URL = 'https://opencourse.dev'
        self._campus = campus

    def get_(self):
        req = requests.get(f'{self._API_URL}/{self._campus}')
        if req.ok:
            courses = req.json()

            for course in courses:
                print(course['dept'], course['course'], course['title'])
