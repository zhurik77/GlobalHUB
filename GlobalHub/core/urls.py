from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('profile', views.profile, name='profile'),
    path('login', views.login_in_profile, name='login'),
    path('news', views.news, name='news'),
    path('events', views.events, name='events'),
    path('create_m', views.create_m, name='create_m'),
    path('clubs', views.clubs, name='clubs'),
    path('create_c', views.create_c, name='create_c'),
    path('chat', views.chat, name='chat'),
    path('unicoin', views.unicoin, name='unicoin'),
    path('eventer', views.eventer, name='eventer')
]
