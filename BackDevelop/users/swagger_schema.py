from drf_yasg import openapi
from rest_framework import status


class SwaggerLoginSchema:
    login_schema = openapi.Schema(type=openapi.TYPE_OBJECT, properties={
        'email': openapi.Schema(type=openapi.TYPE_STRING, description='string'),
        'password': openapi.Schema(type=openapi.TYPE_STRING, description='string'),
    }, required=['username', 'password'])
    login_schema_response = {
        status.HTTP_200_OK: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'refresh': openapi.Schema(type=openapi.TYPE_STRING),
                'access': openapi.Schema(type=openapi.TYPE_STRING)
            }
        ),
        status.HTTP_201_CREATED: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'refresh': openapi.Schema(type=openapi.TYPE_STRING),
                'access': openapi.Schema(type=openapi.TYPE_STRING)
            }
        ),
    }

    logout_schema = openapi.Schema(type=openapi.TYPE_OBJECT, properties={
        'refresh_token': openapi.Schema(type=openapi.TYPE_STRING, description='string'),
    }, required=['refresh_token'])
    logout_schema_response = {
        status.HTTP_200_OK: openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'success': openapi.Schema(type=openapi.TYPE_STRING)
        })
    }
