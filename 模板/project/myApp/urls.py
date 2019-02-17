# -*- coding: utf-8 -*-
# @Time    : 2019\2\13 0013 10:41
# @Author  : 凯
# @File    : urls.py
from django.conf.urls import url, include
from . import views
app_name = 'myApp'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^students/$', views.students),

    url(r'^main/$', views.main),
    url(r'^good/(\d+)/(\d+)/$', views.good,name='good'),
]
