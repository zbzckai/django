# -*- coding: utf-8 -*-
# @Time    : 2019\2\13 0013 10:41
# @Author  : 凯
# @File    : urls.py
from django.conf.urls import url, include
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^upfile/$', views.upfile),
    url(r'^savefile/$', views.savefile),
    url(r'^studentpage/(\d+)/$', views.studentpage)
]
