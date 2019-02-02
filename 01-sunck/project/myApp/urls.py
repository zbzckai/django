# -*- coding: utf-8 -*-
# @Time    : 2019\2\2 0002 14:07
# @Author  : 凯
# @File    : urls.py
from django.conf.urls import url,include
from . import views

urlpatterns = [
    url(r'^$',views.index),
    url(r'^(\d+)/$',views.detail),
    url(r'^grades/$',views.grades),
    url(r'^grades/(\d+)$',views.gradesStudents),
    url(r'^students/$', views.students)
]